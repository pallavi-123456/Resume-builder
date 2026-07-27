import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import PremiumTemplate from "./PremiumTemplate";

const templates = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate,
  premium: PremiumTemplate,
};

const TemplateRenderer = ({ template, data }) => {
  const Template = templates[template] || templates.modern;
  return <Template data={data} />;
};

export default TemplateRenderer;
