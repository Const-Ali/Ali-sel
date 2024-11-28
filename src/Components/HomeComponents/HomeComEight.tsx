import Container from "../Container/Container";

interface HomeComEightProps {
  SrcImg: string;
}

const HomeComEight: React.FC<HomeComEightProps> = ({ SrcImg }) => (
  <Container>
    <div className="flex justify-between items-center ">
      <img src={SrcImg} />
    </div>
  </Container>
);

export default HomeComEight;
