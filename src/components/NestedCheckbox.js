
import React, { useState, useEffect } from 'react';
import { initialNodes } from '../data/Node';


const initializeState = (nodes) => {
  const state = {};
  const traverse = (node) => {
    state[node.id] = 'unchecked'; // 'checked', 'unchecked', 'indeterminate'
    if (node.children) {
      node.children.forEach(traverse);
    }
  };
  nodes.forEach(traverse);
  return state;
};

const NestedCheckbox = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [checkedState, setCheckedState] = useState(() => initializeState(initialNodes));

  // paraenbt class updated 
  const updateParentState = (nodes, currentStates) => {
    let changed = false;
    const newStates = { ...currentStates };

    const traverse = (node) => {
      if (!node.children) return;

      node.children.forEach(traverse); 

      const childStates = node.children.map(child => newStates[child.id]);
      const allChecked = childStates.every(state => state === 'checked');
      const someChecked = childStates.some(state => state === 'checked' || state === 'indeterminate');
      
      let parentState = 'unchecked';
      if (allChecked) {
        parentState = 'checked';
      } else if (someChecked) {
        parentState = 'indeterminate';
      }

      if (newStates[node.id] !== parentState) {
        newStates[node.id] = parentState;
        changed = true;
      }
    };
    
    
    nodes.forEach(traverse);
    return { newStates, changed };
  };

  useEffect(() => {
    let currentStates = checkedState;
    let changed = true;
    // update parent
    while (changed) {
      const result = updateParentState(nodes, currentStates);
      currentStates = result.newStates;
      changed = result.changed;
    }
    if (JSON.stringify(currentStates) !== JSON.stringify(checkedState)) {
      setCheckedState(currentStates);
    }
  }, [checkedState, nodes]);

  // check box click handle function
  const handleCheck = (nodeId) => {
    const newCheckedState = { ...checkedState };
    const currentState = newCheckedState[nodeId];
    const newState = currentState === 'checked' ? 'unchecked' : 'checked';

    // (Downward Propagation)
    const traverseDown = (node) => {
      newCheckedState[node.id] = newState;
      if (node.children) {
        node.children.forEach(traverseDown);
      }
    };
    
    const findNodeAndTraverse = (nodes, id) => {
        for(const node of nodes) {
            if(node.id === id) {
                traverseDown(node);
                return true;
            }
            if(node.children && findNodeAndTraverse(node.children, id)) {
                return true;
            }
        }
        return false;
    }

    findNodeAndTraverse(nodes, nodeId);
    setCheckedState(newCheckedState);
  };

  // "Select All" handle 
  const handleSelectAll = (e) => {
      const isChecked = e.target.checked;
      const newState = isChecked ? 'checked' : 'unchecked';
      const newCheckedState = {};
      Object.keys(checkedState).forEach(id => {
          newCheckedState[id] = newState;
      });
      setCheckedState(newCheckedState);
  };

  // UI 
  const renderNodes = (nodeList) => {
    return (
      <ul className="node-list">
        {nodeList.map((node) => (
          <li key={node.id}>
            <label>
              <input
                type="checkbox"
                checked={checkedState[node.id] === 'checked'}
                ref={el => el && (el.indeterminate = checkedState[node.id] === 'indeterminate')}
                onChange={() => handleCheck(node.id)}
              />
              <span className="checkbox-custom"></span>
              <span className="node-name">{node.name}</span>
            </label>
            {node.children && renderNodes(node.children)}
          </li>
        ))}
      </ul>
    );
  };
  const getSelectAllState = () => {
  const topLevelStates = nodes.map(node => checkedState[node.id]);
  const allChecked = topLevelStates.every(state => state === 'checked');
  if (allChecked) {
    return 'checked';
  }
  const someChecked = topLevelStates.some(state => state === 'checked' || state === 'indeterminate');
  return someChecked ? 'indeterminate' : 'unchecked';
};

const selectAllStateValue = getSelectAllState();

  return (
    <div className="checkbox-container">
      <div className="header">
        <label>
          <input
            type="checkbox"
            checked={selectAllStateValue === 'checked'}
            ref={el => el && (el.indeterminate = selectAllStateValue === 'indeterminate')}
            onChange={handleSelectAll}
          />
          <span className="checkbox-custom"></span>
          <span className="node-name select-all-text">Select All</span>
        </label>
      </div>
      {renderNodes(nodes)}
    </div>
  );
};

export default NestedCheckbox;