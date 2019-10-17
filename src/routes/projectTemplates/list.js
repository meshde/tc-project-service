/**
 * API to list all project templates
 */
import { middleware as tcMiddleware } from 'tc-core-library-js';
import models from '../../models';

const permissions = tcMiddleware.permissions;

module.exports = [
  permissions('projectTemplate.view'),
  (req, res, next) => models.ProjectTemplate.findAll({
    where: {
      deletedAt: { $eq: null },
      disabled: false,
    },
    attributes: { exclude: ['deletedAt', 'deletedBy'] },
    raw: true,
  })
    .then((projectTemplates) => {
      res.json(projectTemplates);
    })
    .catch(next),
];
