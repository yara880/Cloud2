from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.debug = False
# Define a list of person objects
persons = [
    {
        "id": 1,
        "name": "joudi",
        "age": 15,
        "gender": "female",
        "email": "joudi@gmail.com"
    },
    {
        "id": 2,
        "name": "mariam",
        "age": 18,
        "gender": "Female",
        "email": "mariam@yahoo.com"
    }
]

# GET /persons: Retrieve a list of all person objects
@app.route('/persons', methods=['GET'])
def get_persons():
    return jsonify(persons)

# POST /persons: Create a new person object
@app.route('/persons', methods=['POST'])
def create_person():
    data = request.get_json()
    person = {
        "id": len(persons) + 1,
        "name": data['name'],
        "age": data['age'],
        "gender": data['gender'],
        "email": data['email']
    }
    print("hi")
    persons.append(person)
    print("hi")
    return jsonify(person), 201

# GET /persons/{id}: Retrieve a specific person object by its ID
@app.route('/persons/<int:person_id>', methods=['GET'])
def get_person(person_id):
    person = next((p for p in persons if p["id"] == person_id), None)
    if person is None:
        return jsonify({"message": "Person not found"}), 404
    return jsonify(person)

# PUT /persons/{id}: Update a specific person object by its ID
@app.route('/persons/<int:person_id>', methods=['PUT'])
def update_person(person_id):
    person = next((p for p in persons if p["id"] == person_id), None)
    if person is None:
        return jsonify({"message": "Person not found"}), 404
    data = request.get_json()
    person.update(data)
    return jsonify(person)

# DELETE /persons/{id}: Delete a specific person object by its ID
@app.route('/persons/<int:person_id>', methods=['DELETE'])
def delete_person(person_id):
    person = next((p for p in persons if p["id"] == person_id), None)
    if person is None:
        return jsonify({"message": "Person not found"}), 404
    persons.remove(person)
    return jsonify({"message": "Person deleted"})

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80,debug=True)
