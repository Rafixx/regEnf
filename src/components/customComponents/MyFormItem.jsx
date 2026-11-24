import { Form, Col, Checkbox, Input, InputNumber, DatePicker, TimePicker, Select, Switch } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import 'dayjs/locale/es';

const MyFormItem = ({ field, style }) => {
  switch (field.type) {    
  case 'Checkbox':
    return (
      // <Col>
      <Form.Item 
        name={field.name}
        valuePropName="checked" 
        wrapperCol={{ span: 2 }} 
        style={{ ...style, ...field.invisible ? { display: 'none' } : {} }}   
      >
        <Checkbox  
          {...field.selectProps}
        >
          {field.label}
        </Checkbox>
      </Form.Item>
      // </Col>
    );
  case 'InputNumber':
    return(
      // <Col >
        <Form.Item 
          label={field.label} 
          name={field.name}
          wrapperCol={{ span: 16 }}
          style={{ ...style, ...field.invisible ? { display: 'none' } : {} }} 
        >
          <InputNumber 
            precision={field.precision} 
            addonAfter={field.addonAfter}
            {...field.selectProps}
          />
        </Form.Item>
      // </Col>
    )
    case 'Input':
      return(
        // <Col >
          <Form.Item 
            label={field.label} 
            name={field.name}
            wrapperCol={{ span: 24 }} 
            style={{ ...style, ...field.invisible ? { display: 'none' } : {} }} 
          >
            <Input 
              {...field.selectProps}
            />
          </Form.Item>
        // </Col>
      )
    case 'DatePicker':
      return(
        // <Col >
          <Form.Item 
            label={field.label} 
            name={field.name}
            wrapperCol={{ span: 24 }} 
            style={{ ...style, ...field.invisible ? { display: 'none' } : {} }} 
          >
            <DatePicker 
              locale={locale}
              style={{ width: '100%' }} 
              format="DD/MM/YYYY"
              {...field.selectProps}
            />
          </Form.Item>     
        // </Col>
      )
      case 'TimePicker':
        return(
          // <Col >
            <Form.Item 
              label={field.label} 
              name={field.name}
              // wrapperCol={{ span: 24 }} 
              style={{ ...style, ...field.invisible ? { display: 'none' } : {} }} 
            >
              <TimePicker 
                locale={locale}
                style={{ width: '100%' }} 
                format="HH:mm"
                {...field.selectProps}
              />
            </Form.Item>     
          // </Col>
        )
      case 'Select':
      return(
        // <Col >
          <Form.Item 
            label={field.label} 
            name={field.name}
            wrapperCol={{ span: 24 }} 
            style={{ ...style, ...field.invisible ? { display: 'none' } : {} }} 
          > 
            <Select      
              options={field.options}
              {...field.selectProps}
            />
          </Form.Item>     
        // </Col>
      )
    case 'TextArea':
      return(
        // <Col >
          <Form.Item 
            label={field.label} 
            name={field.name}
            style={{ ...style, ...field.invisible ? { display: 'none' } : {} }} 
          >
            <Input.TextArea 
              rows={5}
              style={{ width: '100%' }} 
              {...field.selectProps}
            />
          </Form.Item>     
        // </Col>        
      )
    case 'Switch':
      return(
        // <Col >
          <Form.Item 
            label={field.label} 
            name={field.name}
            valuePropName="checked" 
            style={{ ...style, ...field.invisible ? { display: 'none' } : {} }}
          >
            <Switch       
              {...field.selectProps}
            />
          </Form.Item>     
        // </Col>        
      )
    default:
      return null;
  }
};

export default MyFormItem;