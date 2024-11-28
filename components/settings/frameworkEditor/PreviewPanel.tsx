import { useFormContext } from "react-hook-form";

const PreviewPanel = () => {
  const { watch } = useFormContext();
  const questionText = watch("questionText");
  const answerType = watch("answerType");
  const answerOptions = watch("answerOptions", []);
  const minLength = watch("minLength");
  const helpText = watch("helpText");
  const maxLength = watch("maxLength");
  const isRequired = watch("isRequired");
  console.log("isRequired value:", isRequired);
  
  const formattedAnswerOptions = Array.isArray(answerOptions) ? answerOptions : [];

  console.log("Answer Options:", formattedAnswerOptions); // Debugging

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
