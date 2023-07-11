<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\RegisterRequest;
use App\Models\Cities;
use App\Models\Category;
use App\Models\Settings;
use Validator;

class RegisterRequestController extends Controller
{
    public function getById(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => 'Validation Error.', $validator->errors(),
                'status'=> 500
            ];
            return response()->json($response, 404);
        }

        $data = RegisterRequest::find($request->id);

        if (is_null($data)) {
            $response = [
                'success' => false,
                'message' => 'Data not found.',
                'status' => 404
            ];
            return response()->json($response, 404);
        }

        $response = [
            'data'=>$data,
            'success' => true,
            'status' => 200,
        ];
        return response()->json($response, 200);
    }
    public function save(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name'=>'required',
            'country_code'=>'required',
            'mobile'=>'required',
            'cover'=>'required',
            'gender' => 'required',
            'type' => 'required',
            'zipcode'=>'required',
            'categories'=>'required',
            'email'=>'required',
            'password'=>'required',
            'address' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            // 'name' => 'required',
            'about' => 'required',
            // 'fee_start' => 'required',
            'cid' => 'required',
            'dob' => 'required',
            'id_card' => 'required',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => 'Validation Error.', $validator->errors(),
                'status'=> 500
            ];
            return response()->json($response, 404);
        }
        $emailValidation = RegisterRequest::where('email',$request->email)->first();
        if (is_null($emailValidation) || !$emailValidation) {

            $matchThese = ['country_code' => $request->country_code, 'mobile' => $request->mobile];
            $data = RegisterRequest::where($matchThese)->first();
            if (is_null($data) || !$data) {
                $request->merge(['sub_type' => $request->type]);
                if ($request->type == 'Mobile Beautician') {
                    $request->merge(['type' => 'individual']);
                } else {
                    $request->merge(['type' => 'salon']);
                }
                $data = RegisterRequest::create($request->all());
                if (is_null($data)) {
                    $response = [
                        'data'=>$data,
                        'message' => 'error',
                        'status' => 500,
                    ];
                    return response()->json($response, 200);
                }

                $generalInfo = Settings::take(1)->first();
                $subject = '';

                $subject = $request->type . ' Register Request';

                $request->merge([
                    'cover_src' =>base64_encode($this->curl_get_file_contents(env('APP_URL', 'http://api.bunitas.com') . '/storage/images/' . $request->cover))
                ]);
                $request->merge([
                    'id_card_src' =>base64_encode($this->curl_get_file_contents(env('APP_URL', 'http://api.bunitas.com') . '/storage/images/' . $request->id_card))
                ]);
                if (isset($request->qualification)) {
                    $request->merge([
                        'qualification_src' =>base64_encode($this->curl_get_file_contents(env('APP_URL', 'http://api.bunitas.com') . '/storage/images/' . $request->qualification))
                    ]);
                }

                $useremail = env('MAIL_USERNAME', 'verification@bunitas.com');
                $mailTo = Mail::send('mails/notificationForRegister', $request->all()
                , function($message) use($subject,$generalInfo, $useremail){
                    $message->to($useremail, $useremail)
                    ->subject($subject);
                    $message->from($generalInfo->email,$generalInfo->name);
                });

                $response = [
                    'data'=>$data,
                    'success' => true,
                    'status' => 200,
                ];
                return response()->json($response, 200);
            }

            $response = [
                'success' => false,
                'message' => 'Mobile is already registered.',
                'status' => 500
            ];
            return response()->json($response, 500);
        }
        $response = [
            'success' => false,
            'message' => 'Email is already taken',
            'status' => 500
        ];
        return response()->json($response, 500);
        // $data = RegisterRequest::create($request->all());
        // if (is_null($data)) {
        //     $response = [
        //     'data'=>$data,
        //     'message' => 'error',
        //     'status' => 500,
        // ];
        // return response()->json($response, 200);
        // }
        // $response = [
        //     'data'=>$data,
        //     'success' => true,
        //     'status' => 200,
        // ];
        // return response()->json($response, 200);
    }
    function curl_get_file_contents($URL)
    {
        $c = curl_init();
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_URL, $URL);
        $contents = curl_exec($c);
        curl_close($c);

        if ($contents) return $contents;
        else return FALSE;
    }
    public function update(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => 'Validation Error.', $validator->errors(),
                'status'=> 500
            ];
            return response()->json($response, 404);
        }
        $data = RegisterRequest::find($request->id)->update($request->all());
        if (is_null($data)) {
            $response = [
                'success' => false,
                'message' => 'Data not found.',
                'status' => 404
            ];
            return response()->json($response, 404);
        }
        $response = [
            'data'=>$data,
            'success' => true,
            'status' => 200,
        ];
        return response()->json($response, 200);
    }
    public function delete(Request $request){
     $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => 'Validation Error.', $validator->errors(),
                'status'=> 500
            ];
            return response()->json($response, 404);
        }
        $data = RegisterRequest::find($request->id);
        if ($data) {
            $data->delete();
            $response = [
                'data'=>$data,
                'success' => true,
                'status' => 200,
            ];
            return response()->json($response, 200);
        }
        $response = [
            'success' => false,
            'message' => 'Data not found.',
            'status' => 404
        ];
        return response()->json($response, 404);
    }
    public function getAll()
    {
        $data = RegisterRequest::all();
        if ($data) {
            $response = [
                'data'=>$data,
                'success' => true,
                'status' => 200,
            ];
            return response()->json($response, 200);
        }
        $response = [
            'success' => false,
            'message' => 'Data not found.',
            'status' => 404
        ];
        return response()->json($response, 404);
    }

    public function getSalonRequest(Request $request){
        $data = RegisterRequest::where('type', 'salon')->get();
        foreach($data as $loop){
            if($loop && $loop->categories && $loop->categories !=null){
                $ids = explode(',',$loop->categories);
                $cats = Category::WhereIn('id',$ids)->get();
                $loop->web_cates_data = $cats;
            }
            if($loop && $loop->cid && $loop->cid !=null){
                $loop->city_data = Cities::find($loop->cid);
            }

        }
        if (is_null($data)) {
            $response = [
                'success' => false,
                'message' => 'Data not found.',
                'status' => 404
            ];
            return response()->json($response, 404);
        }

        $response = [
            'data'=>$data,
            'success' => true,
            'status' => 200,
        ];
        return response()->json($response, 200);
    }

    public function getIndividualRequest(Request $request){
        $data = RegisterRequest::where('type','individual')->get();
        foreach($data as $loop){
            if($loop && $loop->categories && $loop->categories !=null){
                $ids = explode(',',$loop->categories);
                $cats = Category::WhereIn('id',$ids)->get();
                $loop->web_cates_data = $cats;
            }
            if($loop && $loop->cid && $loop->cid !=null){
                $loop->city_data = Cities::find($loop->cid);
            }

        }
        if (is_null($data)) {
            $response = [
                'success' => false,
                'message' => 'Data not found.',
                'status' => 404
            ];
            return response()->json($response, 404);
        }

        $response = [
            'data'=>$data,
            'success' => true,
            'status' => 200,
        ];
        return response()->json($response, 200);
    }
}
