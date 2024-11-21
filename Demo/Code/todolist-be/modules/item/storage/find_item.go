package storage

import (
	"context"
	"errors"
	"gorm.io/gorm"
	"todo-list/common"
	"todo-list/modules/item/model"
)

// FindItem finds an item by its id
// condition: map[string]interface{}, example: {"id": 1}, {"title": "test"}
func (s *sqlStorage) FindItem(ctx context.Context, condition map[string]interface{}) (*model.TodoItem, error) {
	var item model.TodoItem

	if err := s.db.Where(condition).First(&item).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, common.RecordNotFound
		}
		return nil, common.ErrDB(err)
	}

	return &item, nil
}
