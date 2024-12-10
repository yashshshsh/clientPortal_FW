import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import '../CSS/AIModal.css'
import Modal from "../Components/Modal.js";
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Label,
} from "recharts";
import cloud from "d3-cloud";
import * as d3 from "d3";

const AIModal = ({ insightsData }) => {
    const [loading, setLoading] = useState(false);
    const [sentiments, setSentiments] = useState({});
    const wordCloudRef = useRef(null);

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       setLoading(true);
    //       try {
    //         // const result = await fetchSentimetModalData(params.summaryId);
    //         // setSentiments(result[0] || {});
    //       } catch (error) {
    //         console.error("Error fetching sentiment data:", error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchData();
    //   }, [params.summaryId]);

    useEffect(() => {
        if(insightsData){
            // console.log("INSIGHTS DATA : ",insightsData.undefined[0]);
            setSentiments(insightsData.undefined[0] || {});
        }
    },[insightsData])

    useEffect(()=>{
        if(sentiments){
            console.log("SENTIMENTS : ",sentiments);
        }
    },[sentiments]);

    const {bullet_points: bulletPoints, sentiment_positive_words: positiveKeywords, sentiment_negative_words: negativeKeywords, sentiment_emotions: emotionDataRaw} = sentiments;

    const renderBulletPoints = () => {
        const bulletPointsArray = bulletPoints && typeof bulletPoints === 'object' ? Object.values(bulletPoints) : [];
        
        return bulletPointsArray?.map((point, index) => (
            <li key={index}>{point}</li>
        )) || [];
    };
    

    const renderKeywords = (keywords, colorClass) =>
        Object.entries(keywords || {}).map(([word, count], index) => (
            <div className={`ai_words_smallbox ${colorClass}`} key={index}>
                <p>
                    {word} : <span>{count}</span>
                </p>
            </div>
        ));

    const prepareEmotionData = (emotions) =>
        Object.entries(emotions || {}).map(([emotion, value]) => ({
            name: emotion,
            value,
        }));

    useEffect(()=>{
        if(bulletPoints && positiveKeywords && negativeKeywords && emotionDataRaw){
            console.log("BULLET POINTS : ",bulletPoints);                   
        }
    },[bulletPoints]);

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
        const width = 500;
        const height = 400;

        const layout = cloud()
            .size([width, height])
            .words(words)
            .padding(5)
            .font("Impact")
            .fontSize((d) => d.size)
            .rotate(() => ~~(Math.random() * 2) * 90)
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
                .style("font-family", "Impact")
                .style("font-size", (d) => `${d.size}px`)
                .style("fill", (d) => d.color)
                .attr("text-anchor", "middle")
                .attr("transform", (d) => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
                .text((d) => d.text);
        }
    };

    useEffect(() => {
        if (wordCloudData.length > 0) {
            drawWordCloud(wordCloudData);
        }
    }, [wordCloudData]);

    const emotionData = prepareEmotionData(emotionDataRaw);
    const ref = useRef(null);

    return (
        <Modal modalTitle="Sentimental Analysis" size="modal-lg">
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
                    <div style={{ marginTop: "3rem" }}>
                        <ResponsiveContainer width="100%" aspect={3 / 1}>
                            <BarChart width={700} height={370} data={emotionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name">
                                    <Label value="Emotions" offset={0} position="insideBottom" fill="#337ab7" />
                                </XAxis>
                                <YAxis domain={[0, 1]} tickFormatter={(f) => f}>
                                    <Label value="Values" angle={-90} position="insideLeft" fill="#337ab7" />
                                </YAxis>
                                <Tooltip formatter={(v) => (v === null ? "N/A" : v)} />
                                <Bar dataKey="value" barSize={20} isAnimationActive={false} fill={"#337ab7"} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="ai_modal_smbox">
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
        </Modal>
    );
};

AIModal.propTypes = {
    params: PropTypes.shape({
        // summaryId: PropTypes.number.isRequired,
    }).isRequired,
};

export default AIModal;
