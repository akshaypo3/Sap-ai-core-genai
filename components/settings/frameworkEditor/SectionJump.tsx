import React from "react";

interface Section {
  id: string;
  name: string;
  parent_section_id: string | null;
}

interface SectionOverviewProps {
  data: Section[];
  onNavigate: (id: string) => void;
}

const SectionOverview: React.FC<SectionOverviewProps> = ({
  data,
  onNavigate,
}) => {
  const generateSectionTree = (
    sections: Section[],
    parentId: string | null = null,
  ): Section[] => {
    return sections
      .filter((section) => section.parent_section_id === parentId)
      .map((section) => ({
        ...section,
        children: generateSectionTree(sections, section.id),
      }));
  };

  const sectionTree = generateSectionTree(data);
  const flattenSections = (sections: Section[], path: Section[] = []) => {
    let flattened: { label: string; id: string }[] = [];
    sections.forEach((section) => {
      const currentPath = [...path, section];
      flattened.push({ label: section.name, id: section.id });
      if (section.children) {
        flattened = flattened.concat(
          flattenSections(section.children, currentPath),
        );
      }
    });
    return flattened;
  };

  const sections = flattenSections(sectionTree);

  return (
    <>
      <p className="text-md font-semibold mb-1">Available Sections</p>
      <div className="flex items-center space-x-2 overflow-x-auto p-2 rounded-md border">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
           className="px-4 py-2 rounded-md border text-sm transition bg-gray-100 hover:bg-gray-400 hover:text-black"
          >
            {section.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default SectionOverview;
