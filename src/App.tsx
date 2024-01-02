import React, { ReactElement, ReactNode } from 'react';
import './App.css';


//Conventional props
function Heading({title}: { title: string; }){
  return (<h1>{title}</h1>)
}
function HeadingWithContent({children} :{children: ReactNode}): ReactElement{
  return <h1>{children}</h1>
}

//defaultProps
const defaultContainerProps = {
  heading: <strong> My Heading</strong>
}

type containerProps =  {children: ReactNode} & typeof defaultContainerProps;

function Container ( {heading, children}: containerProps ): ReactElement{
  return (
  <div>
    <h1>{heading}</h1> 
    {children}
  </div>
)}
Container.defaultProps = defaultContainerProps 

// functional props
function TextWithNumber ({
  header,
  children
}: {
  header?: (num: number) => ReactNode;
  children: (num: number) => ReactNode;

  }) {
  const [state, setState] = React.useState<number>(1);
  return (
    <div>
      { header && <h2>{header?.(state)}</h2>}
      <div> {children(state)} </div>
      <div>
        <button onClick={()=> setState(state + 1)}>Increment</button>
      </div>
    </div>
  )
}


// List
function List<ListItem>({
  items,
  render
} : {
  items: ListItem[];
  render: (item: ListItem)=> ReactNode;
}){
  return(
    <ul>
      {items.map((item, index)=>(
        <li key={index}> {render(item)}</li>
    ))}
    </ul>
  );
}




function App() {
  return (
    <div>
    <Heading title='Hello!'></Heading>
    <HeadingWithContent>55</HeadingWithContent>
    <Container> Foo</Container>
    <TextWithNumber
     header={(num: number) => <span>Header {num} </span>}
    >
      {(num: number) => <div>Today's number is {num}</div>}
      </TextWithNumber>
      <List 
      items={["Jack", "Sadie", "Ope" ]} 
      render={(item:string)=> <div>{item.toLowerCase()}</div>}></List>
    </div>
  );
}

export default App;
