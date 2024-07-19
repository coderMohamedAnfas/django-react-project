# models.py
from django.db import models

class SelectedCollege(models.Model):
    name = models.CharField(max_length=255)
    display = models.BooleanField(default=False)

    def __str__(self):
        return self.name
