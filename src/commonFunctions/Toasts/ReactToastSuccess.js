import React from 'react'
import { Button, notification, Space } from 'antd';


const ReactToastSuccess = () => {

  notification.success({
    message: 'Video uploaded successfully',
    showProgress: true,
    placement:"bottomLeft"
  });
}

export default ReactToastSuccess