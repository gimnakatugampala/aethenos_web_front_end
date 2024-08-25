import React from 'react';
import { Button, notification, Space } from 'antd';

const SyllabusToastSuccess = (title) => {
    notification.success({
        message: (
            <span style={{ fontSize: '17px', fontWeight: 'bold' }}>
                {title}
            </span>
        ),
        showProgress: true,
        placement: "bottomLeft"
    });
}

export default SyllabusToastSuccess;
