import Container from "../Container/Container";

interface HomeComEightProps {
  SrcImg: string;
}

const HomeComEight: React.FC<HomeComEightProps> = ({ SrcImg }) => (
  <Container>
    <div className="flex justify-between items-center m-1">
      <img src={SrcImg} className="rounded-lg" />
    </div>
  </Container>
);

export default HomeComEight;
