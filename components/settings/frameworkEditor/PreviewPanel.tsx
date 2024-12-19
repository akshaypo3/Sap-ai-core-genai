import { useFormContext } from "react-hook-form";

const PreviewPanel = () => {
  const { watch } = useFormContext();
  const questionText = watch("questionText");
  const answerType = watch("answerType");
  const answerOptions = watch("answerOptions", []);
  const answerOptionsTable = watch("answerOptionsTable", []);
  const minLength = watch("minLength");
  const helpText = watch("helpText");
  const maxLength = watch("maxLength");
  const isRequired = watch("isRequired");
  
  const formattedAnswerOptions = Array.isArray(answerOptions) ? answerOptions : [];
  const formattedAnswerOptionsTable = Array.isArray(answerOptionsTable) ? answerOptionsTable : [];

  

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
      <h3>Preview:</h3>
      <div>
        <strong>Question:</strong> {questionText}
      </div>
      <div>
        <strong>Answer Type:</strong> {answerType}
      </div>
      {answerType === "MultipleChoice" && formattedAnswerOptions.length > 0 && (
        <div>
          <strong>Answer Options:</strong> {formattedAnswerOptions.join(", ")}
        </div>
      )}
     {answerType === "Table" && formattedAnswerOptionsTable.length > 0 && (
  <div>
    <strong>Answer Options:</strong>
    <ul>
      {formattedAnswerOptionsTable.map((row, index) => (
        <li key={index}>
          Column: {row.column}, Type: {row.type}, Options: {row.options}
        </li>
      ))}
    </ul>
  </div>
)}
      {answerType === "Text" && (
        <>
          <div>
            <strong>Min Length:</strong> {minLength}
          </div>
          <div>
            <strong>Max Length:</strong> {maxLength}
          </div>
        </>
      )}
      {(
        <div>
          <strong>Required:</strong> {isRequired ? "Yes" : "No"}
        </div>
      )}
      {helpText && (
        <div>
          <strong>Help Text:</strong> {helpText}
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;
