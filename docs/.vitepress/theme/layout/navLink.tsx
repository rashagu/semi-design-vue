import {Nav, SubNav, NavItem} from "@kousum/semi-ui-vue";



export function GetNavData(props:{navItem: any[]}) {

  return props.navItem.map(category=>{
    const { items, ...rest } = category;
    return (
      <SubNav {...rest} key={rest.itemKey}>
        {items.map(item=>{
          return (
            //@ts-ignore
            <a href={(import.meta.env.BASE_URL + item.itemKey).replace('//', '/')} key={item.itemKey} >
              <NavItem {...item} tabIndex={-1}/>
            </a>
          );
        })}
      </SubNav>
    );
  });
}
