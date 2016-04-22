/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function(app, fieldsModel) {

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.post("/api/assignment/form/:formId/:fieldId", createReplicaForm);
    app.put("/api/assignment/form/:formId/:startIndex/:endIndex", sort);

    function sort(req, res) {
        var formId = req.params.formId;
        var startIndex = req.params.startIndex;
        var endIndex = req.params.endIndex;

        if(startIndex && endIndex) {
            fieldsModel.sort(formId, startIndex, endIndex)
                .then(
                    function (response) {
                        console.log(response);
                        return res.json(200);
                    },
                    function (error) {
                        res.status(400).send(error);
                    }
                )
        }

    }

    function createReplicaForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldsModel.createReplicaForm(formId, fieldId).then(
            function(resp) {
                res.json(resp);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }


    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        fieldsModel.getFieldsForForm(formId).then(
            function(docs) {
                res.json(docs);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = fieldsModel.getFieldForForm(formId, fieldId);
        res.send(field);
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldsModel.deleteFieldFromForm(formId, fieldId).then(
            function(resp) {
                res.jsonp(resp);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body.field;
        fieldsModel.createFieldForForm(formId, field).then(
            function(docs) {
                res.json(docs);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body.field;
        fieldsModel.updateField(formId, fieldId, field).then(
            function(doc) {
                res.jsonp(doc);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

};