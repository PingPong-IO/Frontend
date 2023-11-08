import React, {useEffect, useState} from 'react';
import '../css/Login.css';
import '../css/test.css';
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from "@table-library/react-table-library/table";

import { useTheme } from "@table-library/react-table-library/theme";

import {
    useSort,
    HeaderCellSort,
} from "@table-library/react-table-library/sort";

import {
    useRowSelect,
    HeaderCellSelect,
    CellSelect,
    SelectClickTypes,
    SelectTypes,
} from "@table-library/react-table-library/select";


const nodes = [
    {
        id: "0",
        name: "test 1 room",
        type: "SETUP",
        isComplete: true,
        nodes: null,
    },
    {
        id: "1",
        name: "VSCode",
        type: "SETUP",
        isComplete: true,
        nodes: [],
    },
    {
        id: "2",
        name: "JavaScript",
        type: "LEARN",
        isComplete: true,
        nodes: []
    },
    {
        id: "3",
        name: "React",
        type: "LEARN",
        isComplete: false,
        nodes: [],
    },
    {
        id: "4",
        name: "Git",
        type: "SETUP",
        isComplete: false,
        nodes: [],
    },
    {
        id: "5",
        name: "Node",
        type: "LEARN",
        isComplete: true,
        nodes: [],
    },
    {
        id: "6",
        name: "GraphQL",
        type: "LEARN",
        isComplete: false,
        nodes: [],
    },
    ];
const THEME = {
    Table: ``,
    Header: ``,
    Body: ``,
    BaseRow: `
    background-color: var(--theme-ui-colors-background);

    &.row-select-selected, &.row-select-single-selected {
      background-color: var(--theme-ui-colors-background-secondary);
      color: var(--theme-ui-colors-text);
    }
  `,
    HeaderRow: `
    font-size: 10px;
    color: var(--theme-ui-colors-text-light);

    .th {
      border-bottom: 1px solid var(--theme-ui-colors-border);
    }
  `,
    Row: `
    font-size: 12px;
    color: var(--theme-ui-colors-text);

    &:not(:last-of-type) .td {
      border-bottom: 1px solid var(--theme-ui-colors-border);
    }

    &:hover {
      color: var(--theme-ui-colors-text-light);
    }
  `,
    BaseCell: `
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;

    padding: 8px;
    height: 52px;

    svg {
      fill: var(--theme-ui-colors-text);
    }
  `,
    HeaderCell: ``,
    Cell: ``,
};


const RoomList = () => {
    const [rooms, setRooms] = useState([]);  // to store rooms

//    useEffect(() => {
//        fetch('/api/rooms')  // adjust the URL to your actual endpoint
//        .then(response => response.json())
//        .then(
//            data => setRooms(data)
//        )
//        .catch(error => console.error('Error fetching rooms:', error));
//        },[]); 
    
  const data = { nodes };

  const theme = useTheme(THEME);

  const sort = useSort(
    data,
    {
      state: { sortKey: "TASK", reverse: true },
    },
    {
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) =>
          array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );

  const select = useRowSelect(
    data,
    {
      onChange: onSelectChange,
    },
    {
      rowSelect: SelectTypes.SingleSelect,
      buttonSelect: SelectTypes.SingleSelect,
    }
  );

  function onSelectChange(action, state) {
    console.log(action, state);
  }

    let div = <>
        <div className="app">
            <header className="app-header">
                {/*<h1>ROOMS</h1>*/}
            </header>
            <main className="main-content" style={{ maxWidth: 'fit-content' }}>
                {/*<Table*/}
                {/*    data={data}*/}
                {/*    theme={theme}*/}
                {/*    layout={{fixedHeader: true}}*/}
                {/*    sort={sort}*/}
                {/*    select={select}*/}
                {/*>*/}
                {/*    {(tableList) => (*/}
                {/*        <>*/}
                {/*            <Header>*/}
                {/*                <HeaderRow>*/}
                {/*                    <HeaderCellSort resize sortKey="TASK">*/}
                {/*                        Task*/}
                {/*                    </HeaderCellSort>*/}
                {/*                    <HeaderCellSort resize sortKey="TYPE">*/}
                {/*                        Type*/}
                {/*                    </HeaderCellSort>*/}
                {/*                    <HeaderCellSort resize sortKey="COMPLETE">*/}
                {/*                        Complete*/}
                {/*                    </HeaderCellSort>*/}
                {/*                    <HeaderCellSort resize sortKey="TASKS">*/}
                {/*                        Tasks*/}
                {/*                    </HeaderCellSort>*/}
                {/*                </HeaderRow>*/}
                {/*            </Header>*/}
                
                {/*            <Body>*/}
                {/*                {tableList.map((item) => (*/}
                {/*                    <Row key={item.id} item={item}>*/}
                {/*                        <Cell>{item.name}</Cell>*/}
                {/*                        <Cell>{item.type}</Cell>*/}
                {/*                        <Cell>{item.isComplete.toString()}</Cell>*/}
                {/*                        <Cell>{item.nodes ? item.nodes.length : ""}</Cell>*/}
                {/*                    </Row>*/}
                {/*                ))}*/}
                {/*            </Body>*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*</Table>*/}
                <div className="menus">
                    <div className="right_scroller" data-menuview="playmulti2" id="multi_menu">
                        <input className="scroller_input in_list block_mm" id="multi_join" placeholder="enter room id or url and hit enter..." autoComplete="off" type="text"></input>
                        <div className="scroller_item scroller_item_giant has_image has_description ns block_mm" id="multi_quickplay" data-hover="hover" data-hit="hit2">
                            <h1>QUICK PLAY</h1>
                            <p>join public custom games</p>
                        </div>  
                        <div className="scroller_item scroller_item_giant has_image has_description ns block_mm" id="multi_createroom" data-hover="hover" data-hit="hit2">
                            <h1>CREATE ROOM</h1>
                            <p>join public custom games</p>
                        </div>                            
                        <div className="scroller_item scroller_item_giant has_image has_description ns block_mm" id="multi_listing" data-hover="hover" data-hit="hit2">
                            <h1>ROOM LISTING</h1>
                            <p>join public custom games</p>
                        </div>
                    </div>                            
                </div>
            </main>
        </div>
    </>
    return div;
};


export default RoomList;