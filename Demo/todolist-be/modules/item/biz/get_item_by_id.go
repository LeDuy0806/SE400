package biz

import (
	"context"
	"todo-list/common"
	"todo-list/modules/item/model"
)

type FindItemStorage interface {
	FindItem(ctx context.Context, condition map[string]interface{}) (*model.TodoItem, error)
}

type getItemBiz struct {
	store FindItemStorage
}

func NewGetItemBiz(store FindItemStorage) *getItemBiz {
	return &getItemBiz{store: store}
}

func (biz *getItemBiz) GetItem(ctx context.Context, id int) (*model.TodoItem, error) {
	data, err := biz.store.FindItem(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return nil, common.ErrCannotGetEntity(model.EntityName, err)
	}

	return data, nil
}
