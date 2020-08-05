import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { TableRow, TableCell, Typography, Button } from "@material-ui/core";
import { EditTable } from "./EditTable";

export const Questions = ({ questions, type }) => {
    const history = useHistory();
    const { survey_id } = useParams();
    console.log(survey_id);
    const tableHeader = type === "values" 
        ? ["タイトル", "選択肢1", "選択肢2", "選択肢3", "選択肢4", ""]
        : ["タイトル", "選択肢1", "選択肢2", ""]
    const questionsList = questions.map(question => {
        const choicesLength = type === "values" ? 4 : 2;
        const choicesList = [...Array(choicesLength).keys()].map(i => {
            return (
                <TableCell>
                    <Typography variant="body1" gutterBottom>{question[`choice${i+1}`]}</Typography>
                </TableCell>
            )
        })
        return (
            <TableRow key={question.id}>
                <TableCell>
                    <Typography variant="body1" gutterBottom>{question.title}</Typography>
                </TableCell>
                {choicesList}
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                    >編集</ Button>
                    <Button
                        variant="contained"
                        color="secondary"
                    >削除</Button>

                </TableCell>
            </TableRow>
        )
    })

    return (
        <>
            <Typography variant="h4" component="h2" gutterBottom>設問一覧</Typography>
            <EditTable dataList={questionsList} headList={tableHeader} />
            <Button variant="contained" onClick={() => history.push("/surveys")}>戻る</Button>
        </>
    )
}