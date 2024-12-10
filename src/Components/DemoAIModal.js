import React, { useState, useEffect, useRef } from "react";
import '../CSS/AIModal.css'
import {
    ResponsiveContainer, BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip, Label,
} from "recharts";
import cloud from "d3-cloud";
import * as d3 from "d3";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AIModalBar from "./ChartsBars/AIModalBar";

const DemoAIModal = ({ insightsData, viewref, showSenti, setShowSenti }) => {
    const [loading, setLoading] = useState(false);
    const [sentiments, setSentiments] = useState({});
    const wordCloudRef = useRef(null);

    useEffect(() => {
        if (insightsData) {
            const data = insightsData?.undefined || [];
            setSentiments(data[0] || {});
        }
    }, [insightsData])

    useEffect(() => {
        if (sentiments) {
            console.log("SENTIMENTS : ", sentiments);
        }
    }, [sentiments]);

    const { bullet_points: bulletPoints, sentiment_positive_words: positiveKeywords, sentiment_negative_words: negativeKeywords, sentiment_emotions: emotionDataRaw } = sentiments;

    const renderBulletPoints = () => {
        const bulletPointsArray = bulletPoints && typeof bulletPoints === 'object' ? Object.values(bulletPoints) : [];

        return bulletPointsArray?.map((point, index) => (
            <li key={index}>{point}</li>
        )) || [];
    };

    const renderKeywords = (keywords, colorClass) =>
        Object.entries(keywords || {}).map(([word, count], index) => {
            const isNegative = colorClass === "negative"; // Check if it's a negative keyword
            return (
                <div
                    className={`ai_words_smallbox ${isNegative ? "ai_negative" : ""}`}
                    key={index}
                >
                    <p className="my-3">
                        {word} : <span>{count}</span>
                    </p>
                </div>
            );
        });


    const prepareEmotionData = (emotions) =>
        Object.entries(emotions || {}).map(([emotion, value]) => ({
            name: emotion,
            value,
        }));

    useEffect(() => {
        if (bulletPoints && positiveKeywords && negativeKeywords && emotionDataRaw) {
            console.log("positiveKeywords : ", positiveKeywords);
            console.log("negativeKeywords : ", negativeKeywords);
        }
    }, [negativeKeywords]);

    const wordCloudData = [
        ...Object.entries(positiveKeywords || {}).map(([word, count]) => ({
            text: word,
            size: count * 10,
            color: "green",
        })),
        ...Object.entries(negativeKeywords || {}).map(([word, count]) => ({
            text: word,
            size: count * 10,
            color: "red",
        })),
    ];

    const drawWordCloud = (words) => {
        const width = wordCloudRef.current.clientWidth || 500;
        const height = wordCloudRef.current.clientHeight || 400;
    
        d3.select(wordCloudRef.current).selectAll("*").remove();
    
        const uniqueWords = Object.values(
            words.reduce((acc, word) => {
                if (acc[word.text]) {
                    acc[word.text].size += word.size; // Sum sizes for duplicates
                } else {
                    acc[word.text] = word; // Add unique word
                }
                return acc;
            }, {})
        );
    
        const layout = cloud()
            .size([width, height])
            .words(uniqueWords)
            .padding(4)
            .font("Roboto")  // Set font to Roboto
            .fontSize((d) => Math.min(d.size * 2, width / 10))
            .rotate(0)
            .on("end", render);
    
        layout.start();
    
        function render(words) {
            const svg = d3
                .select(wordCloudRef.current)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
            svg
                .selectAll("text")
                .data(words)
                .enter()
                .append("text")
                .style("font-family", "Roboto")
                .style("font-size", (d) => `${d.size}px`)
                .style("font-weight", "500") 
                .style("fill", (d) => d.color)
                .attr("text-anchor", "middle")
                .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
                .text((d) => d.text);
        }
    };
    

    useEffect(() => {
        if (wordCloudData.length > 0) {
            drawWordCloud(wordCloudData);
        }
    }, [wordCloudData]);

    const emotionData = prepareEmotionData(emotionDataRaw);
    return (
        <div>
            <Modal size="lg" show={showSenti} onHide={() => setShowSenti(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sentimental Analysis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="ai_modal_mainbox">
                        <div className="ai_modal_smbox">
                            <h3>Audit Highlights</h3>
                            <ul className="bullet_box">{renderBulletPoints()}</ul>
                        </div>
                        <div className="ai_modal_smbox">
                            <h3>Report word cloud</h3>
                            <div className="word_cloud_box">
                                <svg ref={wordCloudRef}></svg>
                            </div>
                            <h3>Customer emotions</h3>
                            <div>
                                <AIModalBar emotionData={emotionData} />
                            </div>
                        </div>
                        <div className="ai_modal_smbox me-3">
                            <h3>Positive keywords</h3>
                            <div className="ai_words_mainbox positive_mainbox">
                                {renderKeywords(positiveKeywords, "positive")}
                            </div>
                            <h3>Negative keywords</h3>
                            <div className="ai_words_mainbox negative_mainbox">
                                {renderKeywords(negativeKeywords, "negative")}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DemoAIModal
