import { useEffect, useState } from "react";
import axios from "axios";
import "../style/QuestionsList.css";

function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await axios.get("http://localhost:5000/api/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error("❌ Sualları çəkmək mümkün olmadı:", err);
      }
    }

    fetchQuestions();
  }, []);

  const uniqueTopics = [...new Set(questions.map((q) => q.topic))];

  const filteredByTopic = selectedTopic
    ? questions.filter((q) => q.topic === selectedTopic)
    : [];

  const groupedByBlock = {};
  for (const q of filteredByTopic) {
    if (!groupedByBlock[q.blockNumber]) {
      groupedByBlock[q.blockNumber] = [];
    }
    groupedByBlock[q.blockNumber].push(q);
  }

  return (
    <div className="questions-page">
      <h2>📚 Mövzular</h2>
      <div className="topics-container">
        {uniqueTopics.map((topic) => (
          <button
            key={topic}
            className={`topic-button ${selectedTopic === topic ? "active" : ""}`}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      {selectedTopic && (
        <div>
          <h3 className="selected-topic-title">🧩 Mövzu: {selectedTopic}</h3>

          {Object.entries(groupedByBlock).map(([blockNum, blockQuestions]) => (
            <div key={blockNum} className="block-card">
              <h4>🔢 Blok {blockNum}</h4>
              <div className="questions-grid">
                {blockQuestions.map((q) => (
                  <div key={q._id} className="question-card">
                    <h5>{q.type === "example" ? "✨ Örnək Sual" : "📝 Ev Tapşırığı"}</h5>
                    <p><strong>Mövzu:</strong> {q.topic}</p>
                    <p><strong>Çətinlik:</strong> {q.difficulty}</p>
                    <p><strong>Kateqoriya:</strong> {q.category}</p>
                    <p><strong>Sual qrupu:</strong> {q.type === "example" ? "Örnek" : "Ev Ödevi"}</p>

                    <div>
                      <p><strong>Sual şəkli:</strong></p>
                      <img src={q.imageUrl} alt="Sual" className="question-img" />
                    </div>

                    {q.answerImageUrl && (
                      <div>
                        <p><strong>Cavab şəkli (Doğru cavab):</strong></p>
                        <img
                          src={q.answerImageUrl}
                          alt="Doğru Cavab"
                          className="answer-img small"
                        />
                      </div>
                    )}

                    {/* Variant şəkilləri göstərilməyibsə backenddə saxlanmır, ona görə test tipi yoxlanmalıdır */}
                    {q.type === "example" && (
                      <div className="variant-container">
                        {['A', 'B', 'C', 'D', 'E'].map((key) => (
                          <div key={key}>
                            <p>Variant {key}:</p>
                            <img
                              src={q[`answerImage_${key}`]}
                              alt={`Variant ${key}`}
                              className="variant-img"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionsList;
