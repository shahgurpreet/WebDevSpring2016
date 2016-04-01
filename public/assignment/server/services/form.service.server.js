/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function(app) {
    var formModel = require("./../models/form.model.server.js")();

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        res.send(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.send(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.send(forms);
    }

    function createFormForUser(req, res) {
        var form = req.body.form;
        var userId = req.params.userId;
        var forms = formModel.createFormForUser(userId, form);
        res.send(forms);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body.form;
        var forms = formModel.updateFormById(formId, form);
        res.send(forms);
    }
};
