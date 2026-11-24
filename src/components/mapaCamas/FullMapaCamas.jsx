import { Row, Col } from "antd";
import CamasPorPlanta from "./CamasPorPlanta";

const FullMapaCamas = ({ mapaCamas }) => {
    return (
      <>
        <Row gutter={[10, 16]} >
          <Col span={12} >
            <h3>PLANTA 1A</h3>
            <CamasPorPlanta planta='1A' mapaCamas={mapaCamas} />
          </Col>
          <Col span={12} >
            <h3>PLANTA 2A</h3>
            <CamasPorPlanta planta='2A' mapaCamas={mapaCamas} />
          </Col>
        </Row>
        <Row gutter={[10, 16]} >
          <Col span={12} >
            <h3>PLANTA 2B</h3>
            <CamasPorPlanta planta='2B' mapaCamas={mapaCamas} />
          </Col>
          <Col span={12} >
            <h3>PLANTA 3A</h3>
            <CamasPorPlanta planta='3A' mapaCamas={mapaCamas} />
          </Col>
        </Row>
        <Row gutter={[10, 16]} >
          <Col span={12} >
            <h3>PLANTA 3B</h3>
            <CamasPorPlanta planta='3B' mapaCamas={mapaCamas} />
          </Col>
        </Row>
      </>
  )
}

export default FullMapaCamas;