import React from 'react'
import { Button, notification, Space } from 'antd';


const ReactToastSuccess = () => {

  notification.success({
    message: (
      <span style={{ fontSize: '17px', fontWeight: 'bold' }}>
          Video uploaded successfully
      </span>
  ),
    showProgress: true,
    placement:"bottomLeft"
  });
}

export default ReactToastSuccess