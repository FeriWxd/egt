import { useState } from "react";
import axios from "axios";
import "../style/UploadQuestion.css";

function UploadQuestion() {
  const [topic, setTopic] = useState("");           // Mövzu
  const [blockNumber, setBlockNumber] = useState(""); // Blok nömrəsi
  const [questionType, setQuestionType] = useState("test");
  const [difficulty, setDifficulty] = useState("kolay");
  const [category, setCategory] = useState("sayisal");
  const [group, setGroup] = useState("örnek");
  const [questionImage, setQuestionImage] = useState(null);
  const [answerImages, setAnswerImages] = useState({
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
  });
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [numericAnswer, setNumericAnswer] = useState("");

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (key) {
      setAnswerImages((prev) => ({ ...prev, [key]: file }));
    } else {
      setQuestionImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("questionType", questionType);
    formData.append("difficulty", difficulty);
    formData.append("category", category);
    formData.append("group", group);
    formData.append("correctAnswer", correctAnswer);
    formData.append("numericAnswer", numericAnswer);
    formData.append("topic", topic); // ✅ topic sahəsi
    formData.append("blockNumber", parseInt(blockNumber)); // ✅ blok nömrəsi say tipinə çevrilir

    if (questionImage) {
      formData.append("questionImage", questionImage);
    }

    if (questionType === "test") {
      ["A", "B", "C", "D", "E"].forEach((key) => {
        if (answerImages[key]) {
          formData.append(`answerImage_${key}`, answerImages[key]);
        }
      });
    }

    try {
      const response = await axios.post("http://localhost:5000/api/questions/upload", formData);
      console.log("✅ Uğurla göndərildi:", response.data);
      alert("Sual uğurla əlavə edildi!");
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Sual yüklənərkən xəta baş verdi.");
    }
  };

  return (
    <div className="upload-wrapper">
      <h2>Sual Əlavə Et</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          Mövzu (topic):
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </label>

        <label>
          Blok nömrəsi:
          <input
            type="number"
            value={blockNumber}
            onChange={(e) => setBlockNumber(e.target.value)}
            required
          />
        </label>

        <label>
          Sual Tipi:
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="test">Test (A,B,C,D,E)</option>
            <option value="open">Açıq Uçlu</option>
          </select>
        </label>

        <label>
          Çətinlik:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="kolay">Kolay</option>
            <option value="orta">Orta</option>
            <option value="çətin">Çətin</option>
          </select>
        </label>

        <label>
          Kateqoriya:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="sayisal">Sayısal</option>
            <option value="geometri">Geometri</option>
          </select>
        </label>

        <label>
          Sual qrupu:
          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="örnek">Örnek</option>
            <option value="ev ödevi">Ev Ödevi</option>
          </select>
        </label>

        <label>
          Sual şəkli:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            required
          />
        </label>

        {questionType === "test" && (
          <>
            <div className="answer-upload">
              {["A", "B", "C", "D", "E"].map((key) => (
                <label key={key}>
                  Variant {key} şəkli:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, key)}
                    required
                  />
                </label>
              ))}
            </div>
            <label>
              Doğru Cavab:
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                {["A", "B", "C", "D", "E"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        {questionType === "open" && (
          <label>
            Dəqiq Cavab:
            <input
              type="number"
              step="0.01"
              value={numericAnswer}
              onChange={(e) => setNumericAnswer(e.target.value)}
              required
            />
          </label>
        )}

        <button type="submit">Yüklə</button>
      </form>
    </div>
  );
}

export default UploadQuestion;
