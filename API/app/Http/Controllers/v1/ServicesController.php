<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Services;
use Validator;
use App\Models\CategoryType;
use App\Models\User;
use DB;

class ServicesController extends Controller
{
    public function save(Request $request){
        $validator = Validator::make($request->all(), [
            'uid' => 'required',
            'name' => 'required',
            'cate_id' => 'required',
            'duration' => 'required',
            'price' => 'required',
            // 'off' => 'required',
            // 'discount' => 'required',
            'images' => 'required',
            'cover' => 'required',
            // 'extra_field' => 'required',
            'status' => 'required',
            'descriptions'=>'required'
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => 'Validation Error.', $validator->errors(),
                'status'=> 500
            ];
            return response()->json($response, 404);
        }

        $data = Services::create($request->all());
        if (is_null($data)) {
            $response = [
            'data'=>$data,
            'message' => 'error',
            'status' => 500,
        ];
        return response()->json($response, 200);
        }
        $response = [
            'data'=>$data,
            'success' => true,
            'status' => 200,
        ];
        return response()->json($response, 200);
    }

    public function getServiceById(Request $request){
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

        $data = Services::find($request->id);
        if($data && $data->cate_id && $data->cate_id !=null){
            $cats = CategoryType::with('parent')->where('id',$data->cate_id)->first();
            $data->web_cates_data = $cats;
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
    public function getByUID(Request $request){
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

        $data = Services::where('uid',$request->id)->first();

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

    public function getMyServices(Request $request){
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

        $data = Services::where('uid',$request->id)->get();
        foreach($data as $loop){
            if($loop && $loop->cate_id && $loop->cate_id !=null){
                $cats = CategoryType::where('id',$loop->cate_id)->first();
                $loop->web_cates_data = $cats;
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
        $data = Services::find($request->id)->update($request->all());

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
        $data = Services::find($request->id);
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

    public function getAll(){
        $data = Services::all();
        foreach($data as $loop){
            if($loop && $loop->cate_id && $loop->cate_id !=null){
                $ids = explode(',',$loop->cate_id);
                $cats = CategoryType::WhereIn('id',$ids)->get();
                $loop->category = $cats;
            }
            if($loop && $loop->uid && $loop->uid !=null){
                $loop->user = User::find($loop->uid);
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

    public function getActiveItem(Request $request){
        $data = Services::where('status',1)->get();

        $response = [
            'data'=>$data,
            'success' => true,
            'status' => 200,
        ];
        return response()->json($response, 200);
    }

    public function getByCategoryId(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'uid' => 'required',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => 'Validation Error.', $validator->errors(),
                'status'=> 500
            ];
            return response()->json($response, 404);
        }
        $data = Services::where(['cate_id'=>$request->id,'uid'=>$request->uid,'status'=>1])->get();
        $response = [
            'data'=>$data,
            'success' => true,
            'status' => 200,
        ];
        return response()->json($response, 200);
    }

    public function importData(Request $request){
        // $request->validate([
        //     "csv_file" => "required",
        // ]);
        // $file = $request->file("csv_file");
        // $csvData = file_get_contents($file);
        // $rows = array_map("str_getcsv", explode("\n", $csvData));
        // $header = array_shift($rows);
        // foreach ($rows as $row) {
        //     if (isset($row[0])) {
        //         if ($row[0] != "") {

        //             if(count($header) == count($row)){
        //                 $row = array_combine($header, $row);
        //                 $insertInfo =  array(
        //                     'id' => $row['id'],
        //                     'name' => $row['name'],
        //                     'cover' => $row['cover'],
        //                     'status' => $row['status'],
        //                 );
        //                 $checkLead  =  Services::where("id", "=", $row["id"])->first();
        //                 if (!is_null($checkLead)) {
        //                     DB::table('category')->where("id", "=", $row["id"])->update($insertInfo);
        //                 }
        //                 else {
        //                     DB::table('category')->insert($insertInfo);
        //                 }
        //             }
        //         }
        //     }
        // }
        // $response = [
        //     'data'=>'Done',
        //     'success' => true,
        //     'status' => 200,
        // ];
        // return response()->json($response, 200);
    }
}
