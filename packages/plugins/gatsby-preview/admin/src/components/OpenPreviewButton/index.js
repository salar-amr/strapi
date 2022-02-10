import React from 'react';
import { Button } from '@strapi/design-system/Button';
import { useQueries } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import Eye from '@strapi/icons/Eye';
import pluginId from '../../pluginId';
import getTrad from '../../utils/getTrad';
import { fetchSettings } from '../../pages/SettingsPage/utils/api';

const OpenPreviewButton = () => {
  const [{ data, isLoading }] = useQueries([
    {
      queryKey: `${pluginId}-settings`,
      queryFn: fetchSettings,
    },
  ]);
  const { formatMessage } = useIntl();

  const { params } = useRouteMatch(`/content-manager/:kind/:uid`);
  const { isCreatingEntry, initialData } = useCMEditViewDataManager();

  const uid = params?.uid || null;

  if (isLoading || !uid) {
    return null;
  }

  if (!data.contentSyncURL) {
    return null;
  }

  if (!data.previews[uid]) {
    return null;
  }

  const handleClick = () => {
    const url = `${data.contentSyncURL}/${uid}-${initialData.id}-${initialData.updatedAt}`;

    window.open(url, '_blank').focus();
  };

  return (
    <Button disabled={isCreatingEntry} onClick={handleClick} startIcon={<Eye />} type="button">
      {formatMessage({ id: getTrad('preview-button'), defaultMessage: 'Open Gatsby preview' })}
    </Button>
  );
};

export default OpenPreviewButton;
