'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Lightbulb,
  Database,
  CheckSquare,
  Palette,
  Send,
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

const brainNodes = [
  {
    id: 'stories',
    label: 'Stories',
    hemisphere: 'left',
    subtitle: 'Planning • Outcomes',
    description: 'Your what & why.',
    color: 'bg-teal-500',
    icon: BookOpen,
  },
  {
    id: 'notes',
    label: 'Notes',
    hemisphere: 'left',
    subtitle: 'Idea Lab',
    description: 'Your quick capture idea lab.',
    color: 'bg-orange-400',
    icon: Lightbulb,
  },
  {
    id: 'library',
    label: 'Library',
    hemisphere: 'left',
    subtitle: 'Content Store',
    description: 'Your unified content store.',
    color: 'bg-red-500',
    icon: Database,
  },
  {
    id: 'task',
    label: 'Task',
    hemisphere: 'right',
    subtitle: 'Work • Actions',
    description: 'Your how & when.',
    color: 'bg-purple-500',
    icon: CheckSquare,
  },
  {
    id: 'canvas',
    label: 'Canvas',
    hemisphere: 'right',
    subtitle: 'Visual Space',
    description: 'Your visual thinking space.',
    color: 'bg-[#8fb05a]',
    icon: Palette,
  },
  {
    id: 'post',
    label: 'Post',
    hemisphere: 'right',
    subtitle: 'Publishing Platform',
    description: 'Your publishing platform.',
    action: "Open right panel form to add a day's challenge performance detail.",
    color: 'bg-blue-500',
    icon: Send,
  },
];

type BrainNode = (typeof brainNodes)[number];

function NodeCard({
  node,
  isActive,
  onClick,
  alignRight = false,
}: {
  node: BrainNode;
  isActive: boolean;
  onClick: () => void;
  alignRight?: boolean;
}) {
  const Icon = node.icon;

  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-4 p-4 w-full rounded-xl transition-all duration-200 text-left
        ${isActive ? 'bg-white shadow-lg ring-2 ring-offset-2' : 'bg-white/50 shadow hover:bg-white hover:shadow-md'}
        ${alignRight ? 'flex-row-reverse text-right' : 'flex-row'}
      `}
    >
      <div className={`flex-shrink-0 p-3 rounded-lg text-white transition-transform group-hover:scale-110 ${node.color} shadow-sm`}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-bold text-slate-800">{node.label}</h4>
        <p className="text-xs text-slate-500 line-clamp-1">{node.description}</p>
      </div>
      <div className={`hidden md:block absolute top-1/2 w-8 h-px bg-slate-300 ${alignRight ? '-left-8' : '-right-8'}`} />
    </button>
  );
}

export default function SecondBrainMap() {
  const [activeNode, setActiveNode] = useState<BrainNode | null>(null);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  const handleNodeClick = (node: BrainNode) => {
    setActiveNode(node);
    if (node.id === 'post') {
      setIsRightPanelOpen(true);
    } else {
      setIsRightPanelOpen(false);
    }
  };

  const leftNodes = brainNodes.filter((n) => n.hemisphere === 'left');
  const rightNodes = brainNodes.filter((n) => n.hemisphere === 'right');

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-slate-50 rounded-xl shadow-lg font-sans flex overflow-hidden relative min-h-[600px]">
      <div className={`flex-1 transition-all duration-300 ${isRightPanelOpen ? 'w-2/3 pr-6 border-r border-slate-200' : 'w-full'}`}>
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full bg-teal-500 opacity-80"></div>
            <div className="w-4 h-4 rounded-full bg-purple-500 opacity-80"></div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Execution</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 relative">
          <div className="flex flex-col gap-6 flex-1 z-10">
            {leftNodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeNode?.id === node.id}
                onClick={() => handleNodeClick(node)}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-white rounded-2xl shadow-inner border border-slate-100 z-10 min-h-[300px]">
            {activeNode ? (
              <div>
                <div className={`inline-flex p-4 rounded-full ${activeNode.color} text-white mb-4 shadow-md`}>
                  <activeNode.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{activeNode.label}</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">{activeNode.subtitle}</p>
                <p className="text-slate-600 text-lg mb-4">{activeNode.description}</p>
                {activeNode.action && (
                  <div className="mt-4 p-3 bg-slate-100 rounded-lg text-sm text-slate-700 border border-slate-200">
                    <span className="font-semibold block mb-1">Action Triggered:</span>
                    {activeNode.action}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-400 flex flex-col items-center">
                <BrainCircuit size={64} className="mb-4 opacity-50" />
                <p className="text-lg">Select a node to view details</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 flex-1 z-10">
            {rightNodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeNode?.id === node.id}
                onClick={() => handleNodeClick(node)}
                alignRight
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-center gap-4 text-xl font-medium text-slate-700">
            <span>Capture</span>
            <ArrowLeft className="text-slate-400" size={20} />
            <span className="font-bold text-slate-900">Knowledge</span>
            <ArrowRight className="text-slate-400" size={20} />
            <span>Creation</span>
          </div>
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="w-3 h-3 rounded-full bg-[#8fb05a]"></div>
          </div>
        </div>
      </div>

      <div className={`absolute top-0 right-0 h-full w-1/3 bg-white shadow-[-10px_0_20px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-in-out p-6 overflow-y-auto ${isRightPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Performance Log</h3>
          <button
            onClick={() => setIsRightPanelOpen(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Add today&apos;s challenge performance details below to publish to your feed.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Challenge Select</label>
            <select className="w-full p-2 border border-slate-200 rounded-md bg-slate-50">
              <option>Bookworm Challenge</option>
              <option>Daily Standup</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Performance Notes</label>
            <textarea
              rows={4}
              className="w-full p-2 border border-slate-200 rounded-md bg-slate-50 resize-none"
              placeholder="How did you execute today?"
            ></textarea>
          </div>

          <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-colors">
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}
