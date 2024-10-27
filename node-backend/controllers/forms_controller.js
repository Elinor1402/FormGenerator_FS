const DB = require("../services/database");


const getFormData = async function (req, res) {
    try {
        const { answer } = req.query;
        console.log("Amswer", answer);

        // Query to fetch all required data using joins
        const query = `
        SELECT
        q.id AS question_id,
        q.question,
        q.page,
        qa.answer_type,
        a.id AS answer_id,
        a.answer
        FROM
        atoq at
        JOIN questions q ON q.id = at.next_questionid
        JOIN q_appearance qa ON qa.questionid = q.id
        LEFT JOIN qtoa qt ON qt.questionid = q.id AND qa.answer_type = 2
        LEFT JOIN answers a ON a.id = qt.answerid
        WHERE at.answerid IN (
        SELECT a.id FROM answers a WHERE a.answer = $1
        );
`;
        // Execute the query
        const result = await DB.query(query, [answer]);
        const rows = result.rows;

        // Process the result to group answers by question
        const questionsMap = {};
        rows.forEach((row) => {
            const questionId = row.question_id;
            if (!questionsMap[questionId]) {
                questionsMap[questionId] = {
                    question: row.question,
                    page: row.page,
                    answerType: row.answer_type,
                    answers: row.answer_type === 2 ? [] : "None",
                };
            }
            if (row.answer_type === 2) {
                questionsMap[questionId].answers.push({
                    answer: row.answer,
                });
            }
        });
    
        // Convert the map to a list
        const finalResult = Object.values(questionsMap);
        console.log(finalResult);
        // Send the final result as response
        return res.status(200).send(finalResult);
    } catch (error) {
        console.log(error);
        return res.status(404).send("Questions not found");
    }
};

const getDomainsData = async function (req, res) {
    try {
        const answer = 'Organization’s domain';
        const query = `
        SELECT a.answer
        FROM answers a
        JOIN qtoa q ON a.id = q.answerid
        JOIN questions qs ON q.questionid = qs.id
        WHERE qs.question = $1`;

        // Execute the query
        const result = await DB.query(query, [answer]);
        const answers = result.rows;

        // If no answers found, return 404
        if (answers.length === 0) {
            return res.status(404).send("No domains found");
        }

        // Send the answers in the desired format
        return res.status(200).send(answers);

    } catch (error) {
        console.log(error);
        return res.status(404).send("Questions not found");
    }
}

module.exports = { getFormData, getDomainsData }