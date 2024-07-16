import { get } from 'lodash';
import Table, { TableProps } from '../../table';
import { omit } from 'lodash';

const table = (props: TableProps) => {
  const { children } = props;
  const toArray = (value) => (Array.isArray(value) ? value : [value]);
  const columnsFiber = toArray(get(children[0], 'children[0].children'));
  const dataFiber = toArray(get(children[1], 'children'));

  const titles: string[] = columnsFiber.map((item) => item?.children || '');
  const tableDataSource: any[] = [];
  for (let i = 0; i < dataFiber.length; i++) {
    let item: Record<string, string> = {
      key: String(i),
    };
    dataFiber[i].children.forEach((child, index) => {
      item[titles[index]] = child?.children ?? '';
    });
    tableDataSource.push(item);
  }

  return (
    <Table
      dataSource={tableDataSource}
      columns={titles.map((title) => {
        return {
          title,
          dataIndex: title,
        };
      })}
      {...omit(props, 'children')}
    />
  );
};

export default table;
