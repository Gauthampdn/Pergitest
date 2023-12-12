
const Cards = ({ projects }) => {
  return (
      <div className="grid-container">
          {projects.map((project, index) => (
              <div
                  key={index}
                  className={`card ${project.gridClass} ${project.textPosition === 'top-left' ? 'card-top-left' : project.textPosition === 'bottom-left' ? 'card-bottom-left' : project.textPosition === 'center-middle' ? 'card-center-middle' : ''} ${project.backgroundColor || ''} ${project.theme}-theme`}
                  style={project.backgroundImage ? { backgroundImage: `url(${project.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >

                  {project.tags && (
                      <div className="tags">
                          {project.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="tag">{tag}</span>
                          ))}
                      </div>
                  )}

                  {project.title && <h3>{project.title}</h3>}
                  {project.subtitle && <h4>{project.subtitle}</h4>}
                  {project.description && <p>{project.description}</p>}

                  {/* Conditional rendering of the link button */}
                  {project.link && (
                      <button className="button-link" onClick={() => window.open(project.link, '_blank')}>
                          {project.linknote} ↗
                      </button>
                  )}

              </div>
          ))}
      </div>
  );
};

 
export default Cards;