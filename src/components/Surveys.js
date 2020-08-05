import React from "react";
import { useHistory } from "react-router-dom";
import { TableRow, TableCell, Typography, Button } from "@material-ui/core";
import { EditTable } from "./EditTable";

export const Surveys = ({ surveys }) => {
    const history = useHistory();
    const surveysList = surveys.map(survey => {
        survey.date = survey.created_at.slice(0, 16).replace("T", " ");
        return (
            <TableRow key={survey.id}>
                <TableCell>
                    <Typography variant="body1" gutterBottom>{survey.name}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body1" gutterBottom>{survey.date}</Typography>
                </TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push(`values/${survey.id}`)}
                    >価値観診断</ Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push(`personality/${survey.id}`)}
                    >性格診断</ Button>
                    {survey.selected ? (
                        <Button
                            variant="contained"
                            disabled
                        >選択中</ Button>
                    ) : (
                            <Button
                                variant="contained"
                            >削除</Button>
                        )}

                </TableCell>
            </TableRow>
        )
    })

    return (
        <>
            <Typography variant="h4" component="h2" gutterBottom>調査一覧</Typography>
            <EditTable dataList={surveysList} headList={["タイトル", "作成日時", ""]} />
        </>
    )
}