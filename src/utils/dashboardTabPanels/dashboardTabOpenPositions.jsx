import React, { useState } from "react";

import {
    Grid,
    Typography,
    Table,
    TableContainer,
    TableHead,
    Paper,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from "@mui/material";
import { botAdditionalInfo, orderInfo, orderInfoText } from "../../constants";
import { language } from "../../redux/selectors";
import { connect } from "react-redux";

const DashboardTabOpenPositions = ({ language, botInfo, myBot }) => {
    const tabState = myBot.openPositions;
    const rows = orderInfo.filter(
        (el) => el.botName === myBot.botName && el.position === "open"
    );
    return (
        <Grid container className="bottab">
            <Grid item xs={12}>
                <Typography variant="h6" className="bottab__title">
                    {botInfo.botName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {tabState === 0 ? (
                    <Typography
                        variant="h6"
                        className="bottab__title bottab__yeseva"
                    >
                        {botAdditionalInfo[language].noOpenPosition}
                    </Typography>
                ) : (
                    <Grid container className="orderInfo">
                        <Typography variant="h6" className="orderInfo__title">
                            {botAdditionalInfo[language].yesOpenPosition}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table" stickyHeader>
                                <TableHead className="orderInfo__header">
                                    <TableRow>
                                        <TableCell>
                                            {orderInfoText[language].coin}
                                        </TableCell>
                                        <TableCell align="center">
                                            {orderInfoText[language].amount}
                                        </TableCell>

                                        <TableCell align="center">
                                            {orderInfoText[language].leverage}
                                        </TableCell>
                                        <TableCell align="center">
                                            {orderInfoText[language].status}
                                        </TableCell>
                                        <TableCell align="center" />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={
                                                row.coin +
                                                row.amount +
                                                row.position +
                                                row.leverage +
                                                row.status
                                            }
                                            className="orderInfo__item"
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.coin}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.amount}
                                            </TableCell>

                                            <TableCell
                                                align="center"
                                                className={`${
                                                    parseFloat(row.leverage) <
                                                    10
                                                        ? "orderInfo__item--low"
                                                        : parseFloat(
                                                              row.leverage
                                                          ) < 15
                                                        ? "orderInfo__item--medium"
                                                        : "orderInfo__item--high"
                                                }`}
                                            >
                                                {row.leverage}x
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className={`${
                                                    parseFloat(row.status) > 0
                                                        ? "orderInfo__item--positive"
                                                        : "orderInfo__item--negative"
                                                }`}
                                            >
                                                {row.status}%
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className="botInfo__newBotButton"
                                                >
                                                    {
                                                        botAdditionalInfo[
                                                            language
                                                        ].closePosition
                                                    }
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    language: language(state),
});

export default connect(mapStateToProps, null)(DashboardTabOpenPositions);
