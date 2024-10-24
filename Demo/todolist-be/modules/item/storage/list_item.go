package storage

import (
	"context"
	"todo-list/common"
	"todo-list/modules/item/model"
)

func (s *sqlStorage) ListItem(ctx context.Context,
	filter *model.Filter,
	paging *common.Paging,
	moreKeys ...string,
) ([]model.TodoItem, error) {
	var items []model.TodoItem

	deletedStatus := model.ItemStatusDeleted

	db := s.db.Table(model.TodoItem{}.TableName()).Where("status <> ?", deletedStatus.String())

	if f := filter; f != nil {
		if status := f.Status; status != "" {
			db = db.Where("status = ?", status)
		}
	}

	if err := db.Count(&paging.Total).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	if err := db.Order("id desc").
		Offset((paging.Page - 1) * paging.Limit).
		Limit(paging.Limit).
		Find(&items).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return items, nil
}
