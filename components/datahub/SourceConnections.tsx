import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Node, 
  Edge, 
  NodeTypes,
  NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTranslations } from 'next-intl';


interface CustomNodeData {
  label: string;
  lastContact: string;
  online: boolean;
  type: string;
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  const t = useTranslations("datahub");
  return (
  <div style={{
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    background: 'white',
    width: '200px',
  }}>
    <h3>{data.label}</h3>
    <p>{t("Last Contact:")} {data.lastContact}</p>
    <p>{t("Status:")} {data.online ? t('Online') : t('Offline')}</p>
    <p>{t("Type:")} {data.type}</p>
  </div>
  )
};

const CentralLogo: React.FC = () => {
  const t = useTranslations("datahub");
  return (
  <div style={{
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  }}>
    {t("Your Logo")}
  </div>
  )
};

const FlowDiagram: React.FC = () => {
  const t = useTranslations("datahub");
  const nodes: Node[] = [
    {
      id: 'center',
      type: 'special',
      data: { label: <CentralLogo /> },
      position: { x: 250, y: 250 },
    },
    {
      id: '1',
      type: 'custom',
      data: { 
        label: t('Microsoft Dynamics 365'),
        lastContact: '2023-08-23 14:30',
        online: true,
        type: 'Cloud'
      },
      position: { x: 100, y: 100 },
    },
    {
      id: '2',
      type: 'custom',
      data: { 
        label: t('SharePoint'),
        lastContact: '2023-08-23 15:45',
        online: true,
        type: 'Cloud'
      },
      position: { x: 400, y: 100 },
    },
    {
      id: '3',
      type: 'custom',
      data: { 
        label: t('Document Management System'),
        lastContact: '2023-08-23 12:00',
        online: false,
        type: 'On-Premise'
      },
      position: { x: 250, y: 400 },
    },
  ];

  const edges: Edge[] = [
    { id: 'e1-center', source: '1', target: 'center' },
    { id: 'e2-center', source: '2', target: 'center' },
    { id: 'e3-center', source: '3', target: 'center' },
  ];

  const nodeTypes: NodeTypes = {
    custom: CustomNode,
    special: CentralLogo,
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;