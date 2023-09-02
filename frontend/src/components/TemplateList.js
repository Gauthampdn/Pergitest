import React from 'react';

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

export default TemplateList;
