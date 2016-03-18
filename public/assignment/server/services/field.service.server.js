/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function(app) {

    var fieldsModel = require("./../models/fields.model.js")();

    app.get("/api/assignment/form/:formId/field", getFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFormField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormField);
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.put(" /api/assignment/form/:formId/field/:fieldId", updateFormField);

    function getFormFields(req, res) {
        var formId = req.params.formId;
        var forms = fieldsModel.getFormFields(formId);
        res.send(forms);
    }

    function getFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = fieldsModel.getFormField(formId, fieldId);
        res.send(field);
    }

    function deleteFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = fieldsModel.deleteFormField(formId, fieldId);
        res.send(forms);
    }

    function createFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body.field;
        var forms = fieldsModel.createFormField(formId, field);
    }

    function updateFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body.field;
        var forms = fieldsModel.updateFormField(formId, fieldId, field);
    }

};