/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function(app) {
    app.get("/api/assignment/form/:formId/field", getFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFormField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormField);
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.put(" /api/assignment/form/:formId/field/:fieldId", updateFormField);

    function getFormFields(req, res) {

    }

    function getFormField(req, res) {

    }

    function deleteFormField(req, res) {

    }

    function createFormField(req, res) {

    }

    function updateFormField(req, res) {

    }

};