import { get } from 'lodash';
import Table, { TableProps } from '../../table';
import { omit } from 'lodash';

const table = (props: TableProps) => {
  const { children } = props;
  const toArray = (value) => (Array.isArray(value) ? value : [value]);
  const columnsFiber = toArray(get(children[0], 'children[0].children'));
  const dataFiber = toArray(get(children[1], 'children'));

  const titlesColumns = columnsFiber.map((column, i) => {
    return {
      dataIndex: String(i),
      title: column?.props?.children || ""
    };
  });
  const tableDataSource: any[] = [];
  for (let i = 0; i < dataFiber.length; i++) {
    let item: Record<string, string> = {
      key: String(i),
    };
    dataFiber[i]?.children.forEach((child, index) => {
      item[String(index)] = child?.props?.children ?? "";
    });
    tableDataSource.push(item);
  }


  return <Table dataSource={tableDataSource} columns={titlesColumns} {...omit(props, 'children')}/>;
};

export default table;
