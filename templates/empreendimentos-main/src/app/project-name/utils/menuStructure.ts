export type MenuStructureType = {
  title: string;
  submenu: string[];
  caminho: string;
  submenuElements: string[];
};

const generatedMenuStructure = {{ menuStructure }} as MenuStructureType[];


export default generatedMenuStructure;