#!/usr/bin/python3

from flask import Flask, request, Response
import json

app = Flask(__name__)


@app.route('/api/v1/save', methods=['POST'])
def save_json():
    print("request.data:" + str(request.data) )
    # 一度、jsonとして読み込めるか試してみる
    json_data = json.loads(request.data)
    with open("save.json", mode='w') as f:
        f.write(json.dumps(json_data) )
    ret_dict={"mes": "ok" }
    ret_str=json.dumps(ret_dict)
    return ret_str

@app.route('/api/v1/load', methods=['GET'])
def load_json():
    ret_str =""
    ret_data = {}

    with open("save.json") as f:
        ret_str = f.read()
    # 一度、jsonとして読み込めるか試してみる
    ret_data = json.loads(ret_str)
    tmp_str = json.dumps(ret_data)
    return Response(tmp_str, mimetype='application/json')

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')
