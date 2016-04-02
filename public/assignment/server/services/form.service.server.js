/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        formModel.findAllFormsForUser(userId).then(
            function(docs) {
                res.send(docs);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId).then(
            function(doc) {
                res.json(doc);
            },
            function(err){
                res.status(400).send(err);
            }
        )
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId).then(
            function(resp) {
                res.json(resp);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function createFormForUser(req, res) {
        var form = req.body.form;
        var userId = req.params.userId;
        formModel.createFormForUser(userId, form).then(
            function(doc) {
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            }
        )

    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body.form;
        var forms = formModel.updateFormById(formId, form);
        res.send(forms);
    }
};
