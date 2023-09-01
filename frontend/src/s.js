function TemplateList({ templates, onSelect }) {
  return (
    <div>
      {templates.map((template) => (
        <div key={template.title} onClick={() => onSelect(template)}>
          {template.title}
        </div>
      ))}
    </div>
  );
}
