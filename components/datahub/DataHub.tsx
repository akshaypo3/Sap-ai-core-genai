"use client"

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  ReactFlow,
  Background, 
  Controls, 
  applyEdgeChanges, 
  applyNodeChanges, 
  addEdge,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useTranslations } from 'use-intl';

const CustomNode1 = ({ data }) => {
  const t = useTranslations("datahub")
  return (
  <div className="p-4 border rounded-md bg-white">
    {/* <Handle type="target" position="top" /> */}
    <Image src="/sharepoint.webp" alt="Logo" width={150} height={50} className="mb-2"/>
    {/* <div className="font-bold mb-2">{data.label}</div> */}
    {/* <div className="text-sm mb-2">Status: Connected</div> */}
    <div className="grid grid-cols-2 gap-x-3">
      <div className="font-bold text-xs">{t("Status")}</div>
      <div className="font-bold text-xs">{t("Access")}</div>
      <div><Badge className="bg-green-500 hover:bg-green-600">{t("Connected")}</Badge></div>
      <div className="text-sm">{t("4 Groups")}</div>
      {/* <div className="col-span-2"><Button variant="outline" className="w-full mt-2 h-8">Click to view</Button></div> */}
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
  )
};

const CustomNode2 = ({ data }) => (
  <div className="p-4 border rounded-md bg-white">
    <Handle type="target" position="top" />
    <Image src={data.logoUrl} alt="Logo" width={150} height={50} className="mb-2"/>
    {/* <div className="font-bold mb-2">{data.label}</div> */}
    {/* <div className="text-sm">Connected Nodes: {data.connectedNodes}</div> */}
    {/* <Handle type="source" position={Position.Bottom} /> */}
  </div>
);

const CustomNode3 = ({ data }) => {
  const t = useTranslations("datahub")
  useEffect(() => {
    console.log("CustomNode3 is rendering", data);
  }, [data]);

  return (
    <div className="p-4 border rounded-md bg-white" style={{minWidth: '200px', minHeight: '100px'}}>
      {/* <Handle type="target" position="top" /> */}
      <Image src="/sap_s4hana_logo.png" alt="Logo" width={150} height={50} className="mb-2"/>
      {/* <div className="font-bold mb-2">{data.label}</div> */}
      <div className="grid grid-cols-2 gap-x-3">
        <div className="font-bold text-xs">{t("Status")}</div>
        <div className="font-bold text-xs">{t("Access")}</div>
        <div><Badge className="bg-green-500 hover:bg-green-600">{t("Connected")}</Badge></div>
        <div className="text-sm">{t("1 Group")}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = {
  customNode1: CustomNode1,
  customNode2: CustomNode2,
  customNode3: CustomNode3,
};

export default function DataHub() {
  const t = useTranslations("datahub")
    const initialEdges = [
      { id: '1-2', source: '1', target: '2' },
      { id: '3-2', source: '3', target: '2' }
    ];
      
    const initialNodes = [
        {
          id: '1',
          data: { label: t('Sharepoint') },
          position: { x: -300, y: -200 },
          type: 'customNode1',
        },
        {
          id: '2',
          data: { 
            label: t('Sustena'),
            logoUrl: '/sustena_logo_black_wide.png',
            connectedNodes: 2
          },
          position: { x: 0, y: 0 },
          type: 'customNode2',
        },
        {
          id: '3',
          data: { label: t('SAP S/4 HANA') },
          position: { x: 300, y: -200 },
          type: 'customNode3',
        },
    ];

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [viewport, setViewport] = useState({ x: 500, y: 700, zoom: 0.8 });
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            const centerX = width / 2;
            const centerY = height / 2;
            setViewport({
                x: centerX,
                y: centerY,
                zoom: 0.8
            });
        }
    }, []);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    return (
        <div ref={containerRef} style={{ width: '100%', height: '85vh' }}>
            <ReactFlow 
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                minZoom={0.1}
                maxZoom={4}
                defaultViewport={viewport}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}