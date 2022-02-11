import  { useEffect, useState } from 'react';
import axios from 'axios';

const Scoreboard = ({listSize, refreshOn}) => {
    const [scoreBoardData, setScoreBoardData] = useState(null);

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/api/scores');
        const data = Object.keys(response.data).map(item => response.data[item]);
        setScoreBoardData(data);
    }

    const descendingScores = scoreBoardData? [...scoreBoardData].sort((a, b) => b.playerScore - a.playerScore) : null;

    useEffect(() => {
        fetchData()
    }, [refreshOn]);

    return (
    <>
        {descendingScores?.slice(0,listSize).map((scoreData, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{scoreData.playerName}</td>
                    <td>{scoreData.playerScore}</td>
                </tr>
        ))}
    </>
    );
};

export default Scoreboard;
