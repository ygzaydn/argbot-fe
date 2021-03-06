import React, { useEffect } from "react";

import { Grid, Typography } from "@mui/material";

import "../../style/main.scss";

import { connect } from "react-redux";
import { homepageText } from "../../constants";

import { ReactComponent as HomepageLandingSvg } from "../../assets/illustrations/homepage-landing.svg";
import { ReactComponent as HomepageFeaturesSvg } from "../../assets/illustrations/homepage-features.svg";

import FeaturesItem from "../../utils/features/featuresItem";
import StatsItem from "../../utils/stats/statsItem";
import YesevaTitle from "../../utils/yesevaTitle/yesevaTitle";
import FaqAccordion from "../../utils/faqAccordion/faqAccordion";
import { language } from "../../redux/selectors";
import { TickerTape } from "react-tradingview-embed";
import { useLocation } from "react-router";

const Homepage = ({ language }) => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#faq") {
            const faqGrid = document.getElementById("faq");
            faqGrid.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [location]);

    return (
        <Grid container className="homepage">
            <Grid container className="homepage__container">
                <Grid container className="homepage__landing">
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className="homepage__landing--text"
                    >
                        <Typography variant="h6">
                            {homepageText[language].homepageLandingUpText}
                        </Typography>
                        <Typography variant="h2">
                            {homepageText[language].homepageLandingMainText}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={0}
                        sm={6}
                        className="homepage__landing--logo"
                    >
                        <HomepageLandingSvg />
                        <div className="homepage__landing--gradient--1" />
                        <div className="homepage__landing--gradient--2" />
                    </Grid>
                </Grid>
                <Grid container className="homepage__tickertape">
                    <TickerTape
                        widgetProps={{
                            hideTopBar: false,
                            symbols: [
                                {
                                    proName: "BINANCE:BTCUSD",
                                    title: "Bitcoin",
                                },
                                {
                                    proName: "BINANCE:ETHUSD",
                                    title: "Ethereum",
                                },
                                {
                                    proName: "BINANCE:BNBUSD",
                                    title: "Binance Coin",
                                },
                                {
                                    proName: "BINANCE:ADAUSD",
                                    title: "Cardano",
                                },
                                {
                                    proName: "BINANCE:SOLUSD",
                                    title: "Solana",
                                },
                                {
                                    proName: "BINANCE:LUNAUSD",
                                    title: "Luna",
                                },
                                {
                                    proName: "BINANCE:DOTUSD",
                                    title: "Polkadot",
                                },
                            ],
                        }}
                    />
                </Grid>
                <Grid container className="homepage__features">
                    <Grid
                        item
                        xs={0}
                        sm={6}
                        className="homepage__features__logogrid"
                    >
                        <HomepageFeaturesSvg />
                    </Grid>
                    <Grid
                        item
                        xs={0}
                        sm={6}
                        className="homepage__features__textgrid"
                    >
                        <YesevaTitle
                            text={homepageText[language].homepageFeaturesTitle}
                        />

                        {homepageText[language].homepageFeatures.map((el) => (
                            <FeaturesItem info={el} key={el.name} />
                        ))}
                    </Grid>
                </Grid>
                <Grid container className="homepage__discord">
                    <Typography
                        variant="h4"
                        className="homepage__discord--text"
                    >
                        {homepageText[language].discordText}
                    </Typography>
                    <div className="homepage__discord--button">
                        {homepageText[language].discordButtonText}
                    </div>
                </Grid>
                <Grid container className="homepage__stats">
                    <YesevaTitle
                        text={homepageText[language].homepageStatsTitle}
                    />

                    <Grid container className="homepage__stats--itembox">
                        {homepageText[language].homepageStats.map((el) => (
                            <StatsItem info={el} key={el.name} />
                        ))}
                    </Grid>
                </Grid>
                <Grid container className="homepage__faq" id="faq">
                    <YesevaTitle text={homepageText[language].faqTitle} />
                    <FaqAccordion info={homepageText[language].faqInfo} />
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({ language: language(state) });

export default connect(mapStateToProps, null)(Homepage);
