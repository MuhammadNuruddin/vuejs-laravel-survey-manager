<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyAnswerRequest;
use Exception;
use App\Models\Survey;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SurveyQuestion;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\File;
use App\Http\Resources\SurveyResource;
use App\Http\Requests\StoreSurveyRequest;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UpdateSurveyRequest;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestionAnswer;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate(3));
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        // check if image given and save to directory
        if(isset($data['image'])) {
            $relative_path = $this->save_image($data['image']);
            $data['image'] = $relative_path;
        }

        $survey = Survey::create($data);

        // create new question
        foreach ($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }
        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey, Request $request)
    {
        //
        $user = $request->user();
        if($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action!');
        }
        return new SurveyResource($survey);
    }

    public function showForGuest(Survey $survey)
    {
        return new SurveyResource($survey);
    }


    public function storeAnswer(StoreSurveyAnswerRequest $request, Survey $survey) {
        $validated = $request->validated();

        $surveyAnswer = SurveyAnswer::create([
            'survey_id' => $survey->id,
            'start_date' => date('Y-m-d H:i:s'),
            'end_date' => date('Y-m-d H:i:s'),
        ]);

        foreach ($validated['answers'] as $questionId => $answer) {
            $question = SurveyQuestion::where(['id' => $questionId, 'survey_id' => $survey->id])->get();
            if(!$question) {
                return response("Invalid Question ID: \"$questionId\"", 400);
            }

            $data = [
                'survey_question_id' => $questionId,
                'survey_answer_id' => $surveyAnswer->id,
                'answer' => is_array($answer) ? json_encode($answer) : $answer
            ];

            SurveyQuestionAnswer::create($data);
            
            return response('', 201);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();
        // check if image given, save to local file system
        if(isset($data['image'])) {
            $relative_path = $this->save_image($data['image']);
            $data['image'] = $relative_path;

            // if there is old image, delete it
            if($survey->image) {
                $absolute_path = public_path($survey->image);
                File::delete($absolute_path);
            }
        }
        $survey->update($data);
        // get plain ids of existing questions
        $existingIds = $survey->questions->pluck('id')->toArray();
        // get ids of new set of questions
        $newIds = Arr::pluck($data['questions'], 'id');
        // find questions to delete
        $toDelete = array_diff($existingIds, $newIds);
        // find questions to add
        $toAdd = array_diff($newIds, $existingIds);
        // delete questions by to_delete arr
        SurveyQuestion::destroy($toDelete);
        // create new questions
        foreach ($data['questions'] as $question) {
            if(in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }

        }
        // update existing questions
        $questionMap = collect($data['questions'])->keyBy('id');
        foreach($survey->questions as $question) {
            if(isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request)
    {
        //
        $user = $request->user();
        if($user->id !== $survey->user_id) {
            return abort(403, 'Unathorized action!');
        }

        $survey->delete();
        // if there is old image, delete it
        if($survey->image) {
            $absolute_path = public_path($survey->image);
            File::delete($absolute_path);
        }
        return response('', 204);
    }

    // function to process image
    private function save_image($image) {
        // check if image string is valid base64 chars
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // take out base64 encoded string without the mime type
            $image = substr($image, strpos($image, ',') + 1);
            // get file extension
            $type = strtolower($type[1]); // jpg jpeg png gif
            // check if file is an image
            if(!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('File not a valid image, please try again');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if(!$image) {
                throw new \Exception('Image decode failed');
            }
        }else {
            throw new Exception('Did not match data URI with valid image');
        }
        $dir = 'images/';
        $file = Str::random(). '.'. $type;
        $absolute_path = public_path($dir);
        $relative_path = $dir . $file;
        if(!File::exists($absolute_path)) {
            File::makeDirectory($absolute_path, 0755, true);
        }
        file_put_contents($relative_path, $image);
        return $relative_path;
    }

    private function createQuestion($question) {
        if (is_array($question['data'])) {
            $question['data'] = json_encode($question['data']);
        }

        $validator = Validator::make($question, [
            'question' => 'required|string',
            'type' => ['required', Rule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_CHECKBOX,
                Survey::TYPE_RADIO,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_SELECT
            ])],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id'
            ]);

        return SurveyQuestion::create($validator->validated());
    }

    private function updateQuestion(SurveyQuestion $question, $data) {
        if(is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);

            $validator = Validator::make($data, [
                'id' => 'exists:App\Models\SurveyQuestion,id',
                'question' => 'required|string',
                'type' => ['required', Rule::in([
                    Survey::TYPE_TEXT,
                    Survey::TYPE_CHECKBOX,
                    Survey::TYPE_RADIO,
                    Survey::TYPE_TEXTAREA,
                    Survey::TYPE_SELECT
                ])],
                'description' => 'nullable|string',
                'data' => 'present'
            ]);

            return $question->update($validator->validated());
        }
    }
}
