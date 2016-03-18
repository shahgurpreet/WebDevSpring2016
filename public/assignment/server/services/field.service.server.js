/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function(app) {

    var fieldsModel = require("./../models/fields.model.js")();

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put(" /api/assignment/form/:formId/field/:fieldId", updateField);

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var forms = fieldsModel.getFieldsForForm(formId);
        res.send(forms);
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
        var forms = fieldsModel.deleteFieldFromForm(formId, fieldId);
        res.send(forms);
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body.field;
        var forms = fieldsModel.createFieldForForm(formId, field);
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body.field;
        var forms = fieldsModel.updateField(formId, fieldId, field);
    }

};