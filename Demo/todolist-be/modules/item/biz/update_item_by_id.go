package biz

import (
	"context"
	"errors"
	"todo-list/common"
	"todo-list/modules/item/model"
)

type UpdateItemStorage interface {
	FindItem(ctx context.Context, condition map[string]interface{}) (*model.TodoItem, error)
	UpdateItem(ctx context.Context, condition map[string]interface{}, data *model.TodoItemUpdate) error
}

type updateItemBiz struct {
	store UpdateItemStorage
}

func NewUpdateItemBiz(store UpdateItemStorage) *updateItemBiz {
	return &updateItemBiz{store: store}
}

func (biz *updateItemBiz) UpdateItem(ctx context.Context, id int, data *model.TodoItemUpdate) error {
	foundItem, err := biz.store.FindItem(ctx, map[string]interface{}{"id": id})

	if err != nil {
		if errors.Is(err, common.RecordNotFound) {
			return common.ErrCannotGetEntity(model.EntityName, err)
		}
		return common.ErrCannotUpdateEntity(model.EntityName, err)
	}

	if foundItem.Status == model.ItemStatusDeleted {
		return common.ErrEntityDeleted(model.EntityName, model.ErrItemIsDeleted)
	}

	if err := biz.store.UpdateItem(ctx, map[string]interface{}{"id": id}, data); err != nil {
		return common.ErrCannotUpdateEntity(model.EntityName, err)
	}

	return nil
}
