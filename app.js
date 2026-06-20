// =========================================================================
// CLOUD DATABASE CONFIGURATION (GOOGLE SHEETS)
// =========================================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw9ZVSAObK0DbfXadHO9LIQGEaLlmFruZ4AR7HFpsYC2ONmKLGQCQ_93TuS_DpOwog/exec";

// SIGNATURE IMAGE (CV ARSA) - base64 agar tidak perlu file eksternal
const SIGNATURE_CV_ARSA_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAABiCAYAAABKx4YzAAAfI0lEQVR4nO2deVxUZdvHf2fOrMAgm4obCiGEpIkLQqQFRpZbYokkJGmS5fZJ3jJwSx5SJI0yhRQlUwhFwCUlbdGH1JBKsTAXejRFH0ARkG2YYZZzv3/wcl7HGRUUGJb7+/nwx9znvs+5zmHmd+7luq+LIYQQUCgUShMRmNoACoXSsaCiQaFQmgUVDQqF0iyEpjaAQunIKBQKKJVKMAzDl6nValhbW0MqlZrQstaDigaF0kwKCgqQn58PuVyOhIQEHDx4EAKBAIQQEELg4OCAI0eOwM3NzdSmtgpUNCiUJrJ582bk5eXhjz/+wO+//653jOM4vPXWW/D09MSQIUM6rWAAVDQolCaxfv16fPjhh+A4Tq/czs4OUqkU48ePx5dffgmBoPNPE1LRoFAeQmVlJTIzM3nBGDZsGHx8fFBdXY2ZM2fCz8/PxBa2LQx17qJQHs61a9f4IYm7uzsGDRpkYotMBxUNCoXSLDr/AIxCobQoVDQoFEqzoBOhFEoLUlNTg59//hmEEPTo0QOjRo0ytUktDhUNCqWJbNmyBRUVFYiMjDR6PCUlBQcOHEBGRgYAwNfXF8eOHWtLE9sEKhqULgshBIsWLcLBgwchlUohFouRk5MDCwsLo3UzMzPx448/ok+fPpg5cyZ/rLKyEvv27cPcuXOh0Wja8hZMA6FQuiCHDx8mYWFhBIDeX2ZmpkFdtVpN3njjDQKAREZG8uU3btwg27dvJ7179zY4DwDi6+vblrfUZlDRoHQpzp07R1577TViZWVFABChUEgYhuF/6M8++6xBm7feeosAIAKBgJSVlRFCGoRk7NixeiIhlUrJ0qVLjYpGTk4OmTJlCgkKCiJBQUFk6tSpegLUkaCiQekSVFVVEX9/f2JmZsb/qC0tLclnn31G+vTpw5e98cYbfBu1Wk3efPNN/lhGRgY5fPgwsbKyIj169NATm+XLl5O///6bPPnkk3zZc889Rz744ANiaWlJunXrZtATefXVV034RB4dKhqUTk9VVRUZN26c3g/W3NycxMXFES8vL75MLBaTqqoqQgghWq2WhIaG6rUJDQ3leyiNf88//zz5/PPPyZUrV8hTTz1ldJhy75+HhwdZuXIlUSqVJn4yjwYVDUqnRq1WE39/f70fbXh4OPnxxx/J8OHD9crXrVvHt7t7vsPS0tLoj3/06NGkurqaVFZW6vUw7v4TiUTE3NycMAxDIiMjyfHjx0lBQYEJn8jjQ0WD0mmpqKggL7zwgt6P+IMPPiAVFRVkyJAheuXvvvsu3+7GjRvE2dmZPxYdHa0nIGPGjCF5eXmktraWHD9+nAwcONBALAQCARk1ahRJTk4mHMeR2tpaotFoTPg0Wg4qGpROiUKhMBiShIeHk+vXrxMPDw+DH/miRYv4tsuXL7/v0GLz5s2EkIbhS1BQkNE6Y8aMIQkJCUStVpvq9lsVumGtHaFSqXDnzh290HGNSCQSnDx5Eu+//36rhpFTqVTYtGkThg8fDrVafd96hBBYWlrC3Ny81Wx5VFQqFSZNmoSffvoJAPDMM89g9+7dEIvF8PPzw4ULF/TqHz58GB4eHujZsyfy8vLg4+MDlUrFH2dZFnK5HGvWrMG7774LoMHz087Ojn9GMpkMVlZWSElJgbu7O3r27NlGd9v2UOeuNiY3Nxf/+c9/IBTqP3qJRIJffvkFcXFxJrLs/3nxxRebVC8oKAjTp0+HUqkEx3GwtbWFo6MjJBIJBgwY0LpG3oc7d+5g2rRpOHr0KADg2WefRVpaGs6ePYvIyEgDwRg5ciS8vb3RrVs3AIClpSV69eqFq1ev8nVCQ0ORlJSk104qlWL06NE4evQo/Pz8EBgYiLlz57by3bUPaE+jFfj777/x559/oqSkBLm5uRCLxQAAkUiE7OxsXL582cQWtg62trZwcnKCVCqFi4sLtFot1Go1PD098d5777X69TUaDSZOnIgffvgBAODl5YUDBw4gIiIC27dvN9rm66+/RmhoqF7Z2bNncebMGYhEInAch9deew1yudygbVFREbKysjB9+nRedLoCVDSaQWVlJYqLi/mQbhKJBCdOnNAbMjAMA5VKBZVKBY1GA6VS2ezrPPHEExCLxWj819TX1yM+Ph7Dhg174JChpREIBPjwww/x8ccfQygUIigoCKWlpWBZFkDDvV69elWvK28MmUyG7t27o66uDgEBAVi6dCkEAgHMzc0hkUiMum03l9raWgQEBPBDEnt7e8yZMwfvv/8+nJycUFFRYdCGZVns3bsXkydPfuzrdyWoaDyA3bt3o6SkBCzLQiKR4NixY9izZ89jnfOFF17A1atXMXHiRBh79DqdDqtWrYKdnd1jXaetWLduHa5duwahUAiRSIQzZ84gOzv7oe2eeOIJuLm5oVevXnB3d8eYMWPg4eHxyHZER0dj5cqV/OcrV65AJBJh/Pjx+OuvvwzqC4VCJCUl6e0hoTSNLi0ahBBoNBoIBALMnj1b7y3KsiyOHz+OqqqqJp1LJBLpTWASQiCVSrFjxw5IpVIQQqDVauHh4YHS0lIMHz68Ve7J1BQWFuLPP/+EUCiEQCBATU0NQkNDUV9fbxCU925cXFzg7e2NrVu3gmXZZgXo/eeff+Dn54fCwkIMHz4cq1evxsCBAzFlyhScO3fOaJu+ffvixo0bzb6/joJWq4VOpwPLshAKheA4jk+xoNPpIBKJoNPpwDCMwfzaw+hyoqHT6fDrr78CAMrKyhASEgKGYVBbW/vAL3Ujbm5u6N69u15djUaDr776CgMGDIBWq9WrL5fLja6GdBUav6Sffvop0tPTIZPJAAC//vqrwY7Qxi/w8uXLMW7cOHTv3h1OTk4PvcZvv/3Gx62QSCSwtbVFbW0tqqurAQCjR49GWVkZLl68yLc5deoUvLy8Wuo2W4zTp08bJF9qLjKZDGvXrkVGRgZef/11REZG4t///jcuXryIS5cuITs7G8uWLcPevXvh6uqKFStWoLq6Glqtlv//KJVK1NXVwcHBAUOHDtU7f5cRjZKSEmzcuBEcx+HTTz81+HEbw8zMDBEREfw/UK1WIzg4GK6urq1tbqcnLi4OarUaiYmJeisVd+Pp6YkpU6YgPDwcEonkvucKCwvDtm3bjB57/fXXsWHDBoSEhPATpGPHjkVGRgasrKwe+z6ay5o1azBs2DDU1NTwk62NsCyLjRs3Gp1/aW0cHBzg4uLCzwmNHTsWnp6eGDp0KAIDA/XqdirRqKurg0qlgoWFBRQKBW7evImQkBAIhUIoFAqcP3/eoI1EIoFcLgchBCqVCuvWrePX6UUi0WONsykP59KlS6iqqoJEIkFYWBj++usvg4nVmTNnIj4+HlKp1GhXevv27QgLC4NOpwMA3ndkwoQJ2LlzJ1566SV+nuX555/Hvn37HlswCCH3/XEzDIP6+noEBgZCpVLxLx2GYZCXlwc7OztoNBqUl5c/9DoymQzm5uZG57/uheM4WFtbY9euXc3qqXAch27dusHa2poX8AEDBsDe3t74/XUG0cjNzUV5eTmSk5Nx8OBBLFy4ELGxsRAIBAZDDpZlMWHCBLAsC5VKBX9/fyxevJivxzBMlx5OmJqff/4ZsbGxyM7ONlh52rBhAxYtWmS0XVpaGr7++msAwIIFCzBhwgQAwO+//w4/Pz/U1tbCzMwMpaWlzXZI++GHH1BTU8PPszAMg7q6OsyaNQsajea+35eHDXdtbGzwwgsv4Oeff4anp6eBICqVSgQHByMkJKRJQ+dGWjthU4cWjdLSUqxcuRJHjhxBYWHhQ+uPGzcOoaGhCAwM5Cc8Ke2TzMxM7N69mw+dBzQ4VE2bNg1hYWEYPXp0k84TFBSEtLQ0AEBERARiYmIeWP/y5ctYvXo171sjEAiQmprKz480FZFIhISEBOzZswd9+vTBpUuX8M4776C+vh5Aw9xa79698corr+Dw4cPw9/dv9oSkqegQokEIwbVr1wA0ePwFBgbyKx/3zoALBAL0798fDMNAqVQiICAAK1asQG1tLWxsbGBjY2OCO6A8CtXV1SguLsbEiRNx5coVvjwxMRFhYWEPbb9582bMnz+ff0tnZGTA29sbOp0Os2fPRkFBgd6cQuN3pri4WO88IpEIDg4O4DgOt27dQq9evfjhAsdx+Ne//oXc3FwsX76c7x0xDANHR0eUl5dDLBZDqVSiR48ej/1M2gMdQjQOHDiAV199lR+z3su4cePg7OwMjUYDMzMzrF+/nvYkOhGFhYWYMGECPyc1Y8YMbN++ne8N3M3169eRlZWFyspKLF269JGuN3LkSIwaNQoajQY6nQ49e/bExx9/DLVajc2bN993iNRVaJei0WjSnDlzUFlZiZMnT6K0tJQ/3jhXsXnzZnTv3h3e3t7o1auXqcyltAHXrl2Dn58fP1E3d+5cTJs2DevXr+eXCVmWRVFREU6dOnXf89w7Z8VxHPr164f4+HhotVpotVoMGTKErpA9gHYlGtevX8edO3dw5MgRREVFGTgE9e7dG4MHD8Y333wDhmFgZWXVJbJ0d0WUSiXy8/MhEAhACIFcLse0adP43gbLspBKpVAoFA8919ChQyEWi6FSqTBq1Ch8/vnnBrtYu9LekcfF5KLxyy+/4MiRI7C0tMT+/fuRk5NjUGfGjBkYMGAAxo0bhzFjxpjASkpbkJiYiJKSEojFYt6vpjmEhobC3d1d73sUEBDAb4untAxtPl2r0+mwd+9exMbGwsLCAoWFhfwkJwBYWFjwb5fk5GTY2trC3d0d1tbWbW0qpYW52+t2xowZuHPnDt9TFAgEOH36NOrq6oy2lcvlqK+v5zfsDRw4EDt37uSd9DiOw6hRo3Dx4kV8+umnfLvAwEAqGC1Mm4nGrVu3cObMGcybN8/o8qidnR1GjBiBjRs3wsnJCVqt1mA/B6XjkZOTg4qKCojFYsydOxfXr1+HUCiERqN5oMOSn58fZDIZCCFQq9Xw9fVFSkoK7wp+6NAhuLi4GLQrKirCrVu3ADRs1XdwcGidG+vCtLpoHD58GFlZWSgsLMShQ4cMjvv7+2PKlCno3bs3pkyZwpfTt0PH5OTJk0hOTua9N3ft2oWSkhK9Ovdu73/66adhZ2eHwYMHY+DAgdBoNHjrrbf0tswvW7ZMb+/I3UuljWi1Wr1gOZMmTcIzzzzTUrdG+T9aTTRu3ryJSZMm4Z9//jFwtzU3N4ednR127doFFxcX2NratpYZlBampqYGFRUVEAgEEAgEen4zAoEA5eXl/Jv+XoRCIb/KtWfPHtjY2ECr1aJbt24QiUSQy+X8Ssjd5OXlYcOGDfznqKgoODo6GtRTKBRGX0yUlqXFRSM9PR0ajQaffPIJ/vzzT71jXl5eGDhwIHx9fTFr1qyWvjSllbhy5QqOHTsGuVyOAwcOYPfu3U1qN3ToUIwcOZL3d+jRowfWr1/frGtnZ2fju+++41dJevbsibFjxzb7HigtR4uKRmJiIubNm2fghGVubo74+Hj4+PjA2dm5JS9JaUWSk5Nx4MABFBUVITc396H17e3tsXHjRmi1Wmg0Gnh4eOCpp556LBtiY2Nx5MgRAA2bt9LT0+Hj4/NY56Q8Ho8lGrW1tSgsLMTbb7+NgoIC1NXV8YLR6EY7b948zJ07t0VCulFankuXLvE+C9OnT+dXNBiGQXV1tdHVDCcnJ3Tr1g0qlQpbt26Fm5sb1Go1hEJhi0YcW7VqFS8YAPDtt98+cM8Jy7IYMmQIVCoVL2CUlueR/TT27duHrKwsgyjNAODh4YFJkyYhMjKyVcPtUx4NlUqF+Ph4MAyDmJgYlJWVPbD+oEGDEBAQALVaDbVajXnz5hlduWhJoqKisGrVKv5zY5DgzrJ/oyPzSKKxe/duzJo1i39DMQwDmUwGnU6Hbdu2wcvLiw5D2glKpZKPnhUcHIza2lrodDqcOHHCYMlTJpPxsSC8vLwQGxsLhUKBPn36wN3dvc1sXr16NZYvXw6g4bvl4eGBQ4cO0a0C7YRmDU/Onz8Pf39/lJaW8sMQJycnjBgxgg8R3/jFo5gOtVqNEydOQCAQYNasWbh58yZYluUF5G68vb35+BLJycmwsrICx3F8MOW2ZuXKlYiOjuY/79u3D6+88kqb20G5P00SjaqqKsTGxmL//v16a+79+vVDRkYGjW7VDtBoNIiKioJGo4FCoUB8fPx968pkMnz00UcAgLfffrtdeNt+9913yMzMxFdffQWgYZVk8eLFGDJkiIkto9zLA4cn9fX1qK2tRXBwML7//nsAQI8ePaBWqxEXFwd/f3/07du3zYylNKDT6XD79m0wDIOgoCB+TuLChQsGEZ4aJydZlkV6ejrvpj9o0CCT9wgVCgVUKhV+//13BAYGoqamhj/m4+ODkydPmtA6yn15UKLXpUuX6iW29fLyIjU1Nc3JFUtpQYqLi0lqaiqJj4+/b4Lixj8HBwfy+uuvk8WLF5vabKMolUoSGBhoYHf//v1JcHAwKS8vN7WJlPtw357GvQluvby8sH//foPEthzH0biarQQhBAsXLkR1dTXEYjEKCwv5aNHGcHNzw8qVK6FQKODs7IznnnuuDa1tHsHBwUhNTdUrMzc3x+HDh5scyo9iGozOadTW1uK1117T2yPQt29fEELw9NNPo6ysDCzLQq1Wo1u3bvj+++9NlvC3M1FTU4OSkhIUFRUhJCSEDypjbMjh7OwMQgjS0tJgZ2cHnU4HqVTaIZYk582bh9TUVNjY2MDe3h4cx0GtVmPnzp3UcasDYLSncfeS14OwtbVFeno6fH19W8W4rkBxcTF2794NMzMznD592qjfSyP9+/fH1KlTIZfLERUV1YZWtgw1NTVISUnB5s2bUVBQgL1792L8+PGmNovSTIz2NB4WXzMkJATFxcWIiIiggtEMGnsMjWnxVq1ahYMHDyIvL8+grkAggFAohFqtxowZMzB79mxYWlpi5MiRbW12i5CQkIDk5GTk5uZiyZIlSEpKwogRI0xtFuURMNrTaEzkMmPGDGg0Gvz1119wd3eHVquFs7Mzdu7cifr6ekilUjqX0UQuXryIlJQUcByHgwcPorCwECqVyiDTm7OzM2xsbDB58mQsWbIEdXV1kEqlJvGZeFz++9//Ij8/H2+88Qaqq6vBsiyeeuoprFu3jr5sOjBN8ghNTU1FUFAQjcfZTDQaDWJiYvggyPfbMg40+E6Eh4dj6tSpGDZsWBta2fJwHIe4uDh8++23OHHiBF/+0Ucf6bmGUzomJo8R2tlQqVTIz8/H3LlzwbIszp49qzeRaWFhAbVaDQsLC4hEIqSlpcHc3Bwsy2Lo0KEdvue2Y8cOfPLJJygoKOC9hsePH4+YmBi4uLjQvUidgI6R0qmdk5+fj4KCAlhYWCAmJkbv7dqIRCKBr68v/ud//genT59GREQEOI7rFL23oqIi/PbbbygpKcH8+fP5cldXV3h7e2Pr1q0dJnsY5eHQnsZjoFQqERkZiZ9++sloculGAgICEBQUZJB9uzPQGO+iMcFyI3379kVWVhZ1A++EUPlvJrdu3QLHcdi2bRs2bdqE27dvG2wC69+/P7RaLTZs2ABPT0/I5fLHzlLenqioqEB2djYWLVqEsrIyPj+pSCRC9+7dERsbi5dffpmGceykUNFoItXV1cjIyMDGjRvxxx9/GBy3sLBASEgICCH45JNPYGlp2fZGtjIVFRXYt28f4uLicOHCBYPj8+fPx2effWYCyyhtCRWN+0AIAcMwyMnJwerVq6HVavHDDz8Y1BsxYgRWrVoFlmXx0ksvmcDStuGLL77Anj178Msvv+iVr1+/Hq6urlCr1Z36/in/DxWNeyCEoKCgABs3bsT27dvBsixqa2v54wzDYOjQodDpdNi0aRM8PT07pA9FU7g7TWZERARfLhAI4OrqioULF+Ldd981oYUUU0BF4/8oKyvjY1DExMTw4/RGrK2tsXDhQhBCEBkZaTTUfkenpKQEW7ZsgVAohEQiMZomc9SoUZgyZQrCw8NpbpouSpdePSGEQKvVYs2aNdizZ4/BOJ1hGLAsiyVLlmDGjBltGvKurVEqlXjppZdw/PhxvXKGYSAUCrFixQq8+OKL6NGjh9GcI5SuQ5ftafz99984deoUwsLCoNPp9BywbGxs4O3tDQsLC3z99dcQi8Wdwp/CGEqlEjk5OYiOjjYQjEY/i8TERLAs22mfAaV5dDnRUKvVfGj8s2fPGhyfM2cOJk2ahMmTJ5vAurYlMzMTmZmZ2LVrl175woUL8cQTT2DMmDE0lCPFgC4hGuXl5eA4Djt27MCGDRtQVFQEQghYloW1tTU++ugjTJw4EXV1dejfvz8faLezUV9fj9u3b6OmpgbTp0/HjRs3UFlZCQD8DtotW7agV69eMDMzM62xlHZLpxeNGzdu4JVXXjHoVQwfPhy+vr5Yt26diSxrG6qqqpCZmQmJRIKLFy9i9erVesenTp0KqVSKxYsX063qlCbRqUVjyZIlOHbsmJ5gSCQSJCQkwMfHB66uria0rvXZunUr0tLScPToUb1yc3NzJCYmAmjIrC6Xy01hHqWD0qlE49atWygvL8fJkyexZMkSPjEQ0LD1fMCAAdiwYQP8/f1NbGnLw3Eczp8/D6FQiDlz5vBpMpVKJQDA0dERYrEYYWFhNE0m5bHoFKLRuBckPT3dIPDu4MGDMX78eNjb2+O9994zjYGtyO3bt5GUlASO4xAVFaUX1xVoWAkKDQ1FWFgY3NzcTGQlpTPRoUWDEAJCCJYtW4a1a9fqHRMIBEhKSoKPjw8GDhxoIgtbj0OHDiE2NhYajQa//vqr3jF7e3ukpKSAEAJzc3N4e3ubyEpKZ6RDikZpaSnOnTuH4uJihIWF8SHzHB0d4eLigurqaixevBjTpk0zsaUth06nw/Hjx8EwDEpLSxEcHKwXKlAgEGDMmDHgOA4JCQmd2hGNYlo6nEdoQkICvvvuO2RlZemV29vb48CBA/D09DSRZS0PIQRRUVFQKBTQaDTYtGkTP0fTiL29PT744AMwDIMFCxZAJBKZyFpKV6FDiUZMTAyWLl3Kf7azs+PjcE6cOBH9+vUzoXWPB8dxKC0tBdAwaZuZmYmYmBhcvXrVQChYloWdnR04jsO3334LLy8vU5hM6aJ0iOFJTk4OsrKysGbNGr5s+PDh+PHHH9tF8uLH5fz58zh+/DgWLFhgkBjpbnr16oXnn38e1tbWD0zwTKG0Ju1eNI4ePYrAwEBUVFQAAFatWgUHBwc8++yzHV4wtFotwsPDkZ2djXPnzhmt4+joiOjoaCiVSvTv379TLhdTOhbtdnhy8+ZNvPzyy7h8+TJkMhn8/PzwxRdfwMrKqkNuydZqtbh8+TKEQiGuXr2KmTNnQigUori4mO9dyOVy9OvXDwqFAq+++ioiIyOh0+kM8udSKKak3fU0FAoFkpOTkZSUhD/++AODBg3CwYMH4eTkZGrTmo1Wq0ViYiJ0Oh2qq6sfmOoyICAAkydPxptvvtl2BlIoj0C76mls2bIFO3bswKlTp/D+++/D398f/fr16xBOSVqtlt86fvnyZSxYsAACgQA//fSTwUQmwzAQiUQQCoXYsWMHZDIZfHx8OlXwYUrnpd30NDZt2oSFCxfyn59++mm8+OKLJrTo4eh0OuTm5gIAoqOj4enpibVr10IsFkOhUOjVFYvF8PT0hFarhaOjI5KSkqDRaCCXyzt8giRK16Jd9DS+/PJLzJs3j//s5uaG/fv3w8XFxYRWGSc1NRX5+fkQi8VQqVSIi4sz6EncjZOTE8LCwiCRSLB48eI2tJRCaR3aRU8jOTkZQEPejJSUFHh5ecHBwcFk9mg0GlRVVfE9AJZlMXPmTJSUlODKlSu4c+eOQRuBQAArKytoNBq4urpi27ZtUKlUsLKy6vS7aSldC5OKRn19PWbPno1Tp04BANauXWvSLGRXrlzBuXPncOHCBSxbtkwvvN39/Cfs7e3xzDPPwNbWFomJiXw9GhqP0lkxqWicP38eqampAABnZ2dMmDChTa8fHR2NwsJCCIVCiEQi5OXl6UXfvp9QDBgwACtWrIBSqYSTkxNefvll/hgVC0pnx6RzGkOGDMG5c+dgZmaGf/75p8X8Eerq6lBcXAyBQACZTIZly5bh+++/18tYzjAMbty4YbCV/G5YluVTLDo4OOCbb76BRqOBVCpFnz59WsRWCqWjYbKeBiEEJSUlABre6GlpafD19cXgwYObfI7U1FRUVVXpvd3FYjFOnz6NhISER7KLZVmEhoZCKBRCLpdj3bp1dHWDQrkLk/U0CCGwt7fnN2kBDQFznnzySb0t3/eDYRgcOXIEdXV1Tb4mwzB6AsBxHJ577jlERETwEa4EAgEmTJgAobBdzBFTKO0Okw5PfvvtN7zzzju4fPkyampqWvz8gwcPhkwmAyEEdXV1CA0NxYIFC3ihIYRAKpXS0HcUSjNoF34aO3fuxKFDh5Cenv5I7QMDA+Hu7g6NRsOX6XQ6hIeHw87OrqXMpFAoaCeiAQB37txBfn4+WJY1OCYWi3HmzBnMnz8fX331Fdzc3HiB0Ol0GDx4MGxsbNraZAqlS9JuRONhEEKg0WggEonoxCSFYkI6jGhQKJT2AfVEolAozYKKBoVCaRb/CyOc9VrapgmMAAAAAElFTkSuQmCC";

// --- DOM SELEKTORS ---
const loadingOverlay = document.getElementById('loading-overlay'); 

const menuItems = document.querySelectorAll('.menu-item');
const contentViews = document.querySelectorAll('.content-view');
const subTabs = document.querySelectorAll('.sub-tab');
const subTablePanels = document.querySelectorAll('.sub-table-panel');

const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
const sidebarElement = document.querySelector('.sidebar');

const btnAddFile = document.getElementById('btn-add-file');
const fileInput = document.getElementById('file-input');
const btnFileReset = document.getElementById('btn-file-reset');
const fileBadge = document.getElementById('file-badge');
const statusBar = document.getElementById('status-bar');

const dropdownFilter = document.getElementById('filter-dropdown');
const btnFilterReset = document.getElementById('btn-filter-reset');
const btnSaveHistory = document.getElementById('btn-save-history');
const btnCopyQty = document.getElementById('btn-copy-qty');

const btnExportToggle = document.getElementById('btn-export-toggle');
const exportMenuItems = document.getElementById('export-menu-items');
const btnExportXlsx = document.getElementById('btn-export-xlsx');
const btnExportCsv = document.getElementById('btn-export-csv');

const tbodyUtama = document.getElementById('tbody-utama');
const tbodyAksesoris = document.getElementById('tbody-aksesoris');
const tbodyGradeb = document.getElementById('tbody-gradeb'); 
const tbodyMasterList = document.getElementById('tbody-master-list');
const masterSkuCount = document.getElementById('master-sku-count');
const btnSyncCloud = document.getElementById('btn-sync-cloud');

const menuExtension = document.getElementById('menu-extension');

// SECURE MODAL POP-UP DOM
const passwordModal = document.getElementById('password-modal');
const inputExtPassword = document.getElementById('input-ext-password');
const modalErrorMsg = document.getElementById('modal-error-msg');
const btnModalCancel = document.getElementById('btn-modal-cancel');
const btnModalSubmit = document.getElementById('btn-modal-submit');

const dashTotalTerjual = document.getElementById('dash-total-terjual');
const dashSkuAktif = document.getElementById('dash-sku-aktif');
const dashFileCount = document.getElementById('dash-file-count');
const dashFilterDropdown = document.getElementById('dash-filter-dropdown');

// SELEKTOR DOM FITUR INPUT MANUAL
const manualNamaDropdown = document.getElementById('manual-nama-dropdown');
const manualTypeDropdown = document.getElementById('manual-type-dropdown');
const manualWarnaDropdown = document.getElementById('manual-warna-dropdown');
const manualQtyInput = document.getElementById('manual-qty-input');
const btnAddManual = document.getElementById('btn-add-manual');

// SELEKTOR PROCUREMENT DROPDOWN BERANTAI & TANGGAL
const procNoPo = document.getElementById('proc-no-po');
const procTanggalPo = document.getElementById('proc-tanggal-po'); // 🌟 SELEKTOR TANGGAL BARU
const procJenisBarang = document.getElementById('proc-jenis-barang');
const procWarnaLatela = document.getElementById('proc-warna-latela');
const procKodeWarnaVendor = document.getElementById('proc-kode-warna-vendor');
const procVendor = document.getElementById('proc-vendor');
const procKodeVendor = document.getElementById('proc-kode-vendor');
const procNamaKain = document.getElementById('proc-nama-kain');
const procQty = document.getElementById('proc-qty');
const procSatuan = document.getElementById('proc-satuan');
const btnAddProc = document.getElementById('btn-add-proc');
const btnExportPo = document.getElementById('btn-export-po');
const btnResetPo = document.getElementById('btn-reset-po');
const tbodyProcurementList = document.getElementById('tbody-procurement-list');

// --- STATE MANAGEMENT ---
let masterSkus = {}; 
let globalDataKategori = { utama: {}, aksesoris: {}, gradeb: {} };
let totalMasterFiles = 0;
let activeFilterText = "all";

let globalVendorRawData = [];
let currentPoBasket = [];

let salesChartInstance = null; 
let trendChartInstance = null;      
let topProductsChartInstance = null; 
let globalHistoryCloudCache = {};

// --- INITIAL BOOTSTRAP ---
window.addEventListener('DOMContentLoaded', () => {
    const savedSidebarState = localStorage.getItem('sidebarState');
    if (savedSidebarState === 'collapsed' && sidebarElement) {
        sidebarElement.classList.add('collapsed');
        if (btnToggleSidebar) btnToggleSidebar.innerText = "❯";
    }

    // 🌟 INITIALIZE: OTOMATIS KUNCI TANGGAL PO KE HARI INI
    if (procTanggalPo) {
        const hariIni = new Date();
        const yyyy = hariIni.getFullYear();
        let mm = hariIni.getMonth() + 1; 
        let dd = hariIni.getDate();
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        procTanggalPo.value = `${yyyy}-${mm}-${dd}`;
    }

    fetchMasterSkusFromCloud();
    fetchHistoryFromCloud(); 
    fetchVendorMappingFromCloud(); 
    initDashboardEmptyChart(); 
});

if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener('click', () => {
        if (!sidebarElement) return;
        sidebarElement.classList.toggle('collapsed');
        if (sidebarElement.classList.contains('collapsed')) {
            btnToggleSidebar.innerText = "❯";
            localStorage.setItem('sidebarState', 'collapsed');
        } else {
            btnToggleSidebar.innerText = "☰";
            localStorage.setItem('sidebarState', 'expanded');
        }
    });
}

if (btnExportToggle) {
    btnExportToggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (exportMenuItems) exportMenuItems.classList.toggle('show');
    });
}

document.addEventListener('click', () => {
    if (exportMenuItems) exportMenuItems.classList.remove('show');
});

if (menuExtension) {
    menuExtension.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (modalErrorMsg) modalErrorMsg.innerText = ""; 
        if (inputExtPassword) inputExtPassword.value = ""; 
        if (passwordModal) passwordModal.classList.add('show'); 
        setTimeout(() => { if (inputExtPassword) inputExtPassword.focus(); }, 100); 
    });
}

function eksekusiVerifikasiPasswordModal() {
    if (!inputExtPassword) return;
    if (inputExtPassword.value === "latela2026") { 
        if (passwordModal) passwordModal.classList.remove('show'); 
        if (menuExtension) window.open(menuExtension.href, '_blank'); 
        updateStatusMessage("Otorisasi sukses. Database utama berhasil dibuka.");
    } else {
        if (modalErrorMsg) modalErrorMsg.innerText = "⚠️ Password salah! Akses ditolak sistem.";
        updateStatusMessage("Akses ditolak: Percobaan masuk salah.");
    }
}

if (btnModalSubmit) btnModalSubmit.addEventListener('click', eksekusiVerifikasiPasswordModal);
if (btnModalCancel) btnModalCancel.addEventListener('click', () => { if (passwordModal) passwordModal.classList.remove('show'); });
if (inputExtPassword) inputExtPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') eksekusiVerifikasiPasswordModal(); });

if (btnSyncCloud) {
    btnSyncCloud.addEventListener('click', () => {
        fetchMasterSkusFromCloud();
        fetchVendorMappingFromCloud(); 
    });
}

// 1. ENGINE FETCH SKU CORE
function fetchMasterSkusFromCloud() {
    updateStatusMessage("Menghubungkan ke Google Sheets Cloud Database secara Real-Time...");
    if (tbodyMasterList) tbodyMasterList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94a3b8; font-style: italic;">Sinkronisasi data live...</td></tr>`;
    if (loadingOverlay) loadingOverlay.classList.remove('fade-out');

    fetch(`${GOOGLE_SCRIPT_URL}?action=fetch_skus`)
        .then(response => { if (!response.ok) throw new Error("Gagal terhubung ke Apps Script."); return response.json(); })
        .then(jsonData => {
            masterSkus = {};
            jsonData.forEach(row => {
                const skuCode = row['SKU'] || row['sku'] || row['Code'];
                const namaResmi = row['Nama'] || row['nama'] || row['Product'];
                const typeProduk = row['Type'] || row['type'] || '-';
                const warnaProduk = row['Warna'] || row['warna'] || '-';
                const kategoriLogistik = row['Kategori'] || row['kategori'] || 'utama';

                let rawKat = kategoriLogistik.toString().trim().toLowerCase();
                let katClean = 'utama'; 
                if (rawKat.includes('utama')) katClean = 'utama';
                else if (rawKat.includes('aksesoris')) katClean = 'aksesoris';
                else if (rawKat.includes('grade')) katClean = 'gradeb';

                if (skuCode) {
                    masterSkus[skuCode.toString().trim()] = {
                        nama: namaResmi ? namaResmi.toString().trim().toUpperCase() : "TANPA NAMA",
                        type: typeProduk.toString().trim(),
                        warna: warnaProduk.toString().trim(),
                        kategori: katClean
                    };
                }
            });
            updateStatusMessage("Master SKU berhasil disinkronisasi secara INSTAN & LIVE!");
            renderMasterSkuDatabaseView();
            populateDashboardDropdown(); 
            populateManualNamaDropdown(); 
            resetKalkulatorDataState();
        })
        .catch(err => {
            if (tbodyMasterList) tbodyMasterList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #dc2626; font-weight: bold; padding: 20px;">⚠️ SISTEM EROR: ${err.message}</td></tr>`;
        })
        .finally(() => { if (loadingOverlay) setTimeout(() => { loadingOverlay.classList.add('fade-out'); }, 300); });
}

// 2. FETCH MAPPING VENDOR DROPDOWN BERANTAI
function fetchVendorMappingFromCloud() {
    fetch(`${GOOGLE_SCRIPT_URL}?action=fetch_vendor`)
        .then(res => res.json())
        .then(data => {
            globalVendorRawData = data; 
            if (procJenisBarang) procJenisBarang.innerHTML = '<option value="">-- Pilih Jenis Barang --</option>';
            if (procWarnaLatela) { procWarnaLatela.innerHTML = '<option value="">-- Pilih Warna Latela --</option>'; procWarnaLatela.disabled = true; }

            let uniqueJenis = new Set();
            data.forEach(row => {
                let jenis = row['Jenis Barang'] || row['jenis_barang'] || row['Jenis barang'] || row['JENIS BARANG'];
                if(jenis) uniqueJenis.add(jenis.toString().trim());
            });
            Array.from(uniqueJenis).sort().forEach(jenis => {
                const opt = document.createElement('option'); opt.value = jenis; opt.innerText = jenis;
                if (procJenisBarang) procJenisBarang.appendChild(opt);
            });
        })
        .catch(err => console.error("Gagal load vendor mapping:", err));
}

if (procJenisBarang) {
    procJenisBarang.addEventListener('change', () => {
        const selectedJenis = procJenisBarang.value;
        if (procWarnaLatela) procWarnaLatela.innerHTML = '<option value="">-- Pilih Warna Latela --</option>';
        if (procKodeWarnaVendor) procKodeWarnaVendor.value = ''; 
        if (procVendor) procVendor.value = ''; 
        if (procKodeVendor) procKodeVendor.value = ''; 
        if (procNamaKain) procNamaKain.value = '';

        if (!selectedJenis) { if (procWarnaLatela) procWarnaLatela.disabled = true; return; }

        let uniqueWarna = new Set();
        globalVendorRawData.forEach(row => {
            let jenis = row['Jenis Barang'] || row['jenis_barang'] || row['Jenis barang'] || row['JENIS BARANG'];
            let warna = row['Kode Warna Latela'] || row['kode_warna_latela'] || row['Kode warna latela'] || row['KODE WARNA LATELA'];
            if (jenis && jenis.toString().trim() === selectedJenis && warna) uniqueWarna.add(warna.toString().trim());
        });
        Array.from(uniqueWarna).sort().forEach(warna => {
            const opt = document.createElement('option'); opt.value = warna; opt.innerText = warna;
            if (procWarnaLatela) procWarnaLatela.appendChild(opt);
        });
        if (procWarnaLatela) procWarnaLatela.disabled = false;
    });
}

if (procWarnaLatela) {
    procWarnaLatela.addEventListener('change', () => {
        const selectedJenis = procJenisBarang ? procJenisBarang.value : '';
        const selectedWarna = procWarnaLatela.value;
        if (!selectedJenis || !selectedWarna) { 
            if (procKodeWarnaVendor) procKodeWarnaVendor.value = ''; 
            if (procVendor) procVendor.value = ''; 
            if (procKodeVendor) procKodeVendor.value = ''; 
            if (procNamaKain) procNamaKain.value = ''; 
            return; 
        }

        const matchedRow = globalVendorRawData.find(row => {
            let jenis = row['Jenis Barang'] || row['jenis_barang'] || row['Jenis barang'] || row['JENIS BARANG'];
            let warna = row['Kode Warna Latela'] || row['kode_warna_latela'] || row['Kode warna latela'] || row['KODE WARNA LATELA'];
            return jenis && jenis.toString().trim() === selectedJenis && warna && warna.toString().trim() === selectedWarna;
        });
        if (matchedRow) {
            if (procKodeWarnaVendor) procKodeWarnaVendor.value = matchedRow['Kode Warna Vendor'] || matchedRow['kode_warna_vendor'] || matchedRow['Kode warna vendor'] || '-';
            if (procVendor) procVendor.value = matchedRow['Vendor'] || matchedRow['vendor'] || '-';
            if (procKodeVendor) procKodeVendor.value = matchedRow['Kode Vendor'] || matchedRow['kode_vendor'] || matchedRow['Kode vendor'] || '-';
            if (procNamaKain) procNamaKain.value = matchedRow['Nama Kain'] || matchedRow['nama_kain'] || matchedRow['Nama kain'] || '-';
        }
    });
}

if (btnAddProc) {
    btnAddProc.addEventListener('click', () => {
        const jenisBarang = procJenisBarang ? procJenisBarang.value : ''; 
        const warnaLatela = procWarnaLatela ? procWarnaLatela.value : '';
        const kodeWarnaVendor = procKodeWarnaVendor ? procKodeWarnaVendor.value : ''; 
        const vendor = procVendor ? procVendor.value : '';
        const kodeVendor = procKodeVendor ? procKodeVendor.value : ''; 
        const namaKain = procNamaKain ? procNamaKain.value : ''; 
        const qty = procQty ? parseInt(procQty.value, 10) : 0;
        const satuan = procSatuan ? procSatuan.value : 'Roll'; 

        if(!jenisBarang || !warnaLatela || isNaN(qty) || qty <= 0) { updateStatusMessage("⚠️ Gagal: Isi Qty dengan benar."); return; }
        currentPoBasket.push({ jenisBarang, warnaLatela, kodeWarnaVendor, vendor, kodeVendor, namaKain, qty, satuan });
        renderProcurementTable(); 

        // 🔄 RESET FORM SETELAH ITEM DITAMBAHKAN (biar siap input item baru)
        if (procJenisBarang) procJenisBarang.value = '';
        if (procWarnaLatela) { procWarnaLatela.innerHTML = '<option value="">-- Pilih Warna Latela --</option>'; procWarnaLatela.disabled = true; }
        if (procKodeWarnaVendor) procKodeWarnaVendor.value = '';
        if (procVendor) procVendor.value = '';
        if (procKodeVendor) procKodeVendor.value = '';
        if (procNamaKain) procNamaKain.value = '';
        if (procQty) procQty.value = '';

        updateStatusMessage(`Sukses menambah pesanan ${jenisBarang} (${warnaLatela}) ke list PO.`);
    });
}

function renderProcurementTable() {
    if (!tbodyProcurementList) return;
    if(currentPoBasket.length === 0) {
        tbodyProcurementList.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94a3b8; font-style: italic;">Belum ada item ditambahkan ke Surat PO.</td></tr>`; return;
    }
    tbodyProcurementList.innerHTML = '';
    currentPoBasket.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><strong>${item.jenisBarang}</strong></td><td><code>${item.warnaLatela}</code></td><td>${item.kodeWarnaVendor}</td><td>${item.vendor}</td><td><strong>${item.kodeVendor}</strong></td><td>${item.namaKain}</td><td style="text-align: right; padding-right:25px; color:#2563eb;">${item.qty} ${item.satuan}</td>`;
        tbodyProcurementList.appendChild(tr);
    });
}

if (btnResetPo) {
    btnResetPo.addEventListener('click', () => {
        currentPoBasket = []; renderProcurementTable();
        if (procNoPo) procNoPo.value = ''; 
        if (procJenisBarang) procJenisBarang.value = ''; 
        if (procWarnaLatela) { procWarnaLatela.value = ''; procWarnaLatela.disabled = true; }
        if (procKodeWarnaVendor) procKodeWarnaVendor.value = ''; 
        if (procVendor) procVendor.value = ''; 
        if (procKodeVendor) procKodeVendor.value = ''; 
        if (procNamaKain) procNamaKain.value = ''; 
        if (procQty) procQty.value = '';
        if (procSatuan) procSatuan.value = 'Roll';
        
        // Reset Tanggal PO ke Hari Ini Kembali
        if (procTanggalPo) {
            const hariIni = new Date();
            const yyyy = hariIni.getFullYear();
            let mm = hariIni.getMonth() + 1; 
            let dd = hariIni.getDate();
            if (mm < 10) mm = '0' + mm;
            if (dd < 10) dd = '0' + dd;
            procTanggalPo.value = `${yyyy}-${mm}-${dd}`;
        }
    });
}

if (btnExportPo) {
    btnExportPo.addEventListener('click', () => {
        if(currentPoBasket.length === 0) { updateStatusMessage("⚠️ Belum ada item di list PO."); return; }
        const noPoValue = procNoPo ? procNoPo.value.trim() : '';

        // FORMAT TANGGAL YANG DIPILIH USER
        let rawSelectedDate = procTanggalPo ? procTanggalPo.value : '';
        let formattedDate = '-';
        if (rawSelectedDate) {
            const parts = rawSelectedDate.split('-');
            if (parts.length === 3) formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
        }

        // VENDOR DI HEADER DIAMBIL DARI ITEM PERTAMA DI LIST
        const vendorHeader = currentPoBasket[0].vendor || '-';

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginLeft = 28.35; // 1 cm
        const marginRight = 28.35; // 1 cm
        const contentWidth = pageWidth - marginLeft - marginRight;

        // --- HEADER: NAMA PERUSAHAAN (KIRI) & JUDUL (KANAN) ---
        doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
        doc.text('CV ARSA (ARSATEX)', marginLeft, 50);
        doc.text('ORDER PEMBELIAN', pageWidth - marginRight, 50, { align: 'right' });

        // --- ALAMAT (KIRI) ---
        doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
        doc.text('Jl. Majalaya No. 47', marginLeft, 70);
        doc.text('Kp Majalaya Rt 001/002 Kel/Kec. Majalaya', marginLeft, 84);
        doc.text('Bandung. Jawa Barat', marginLeft, 98);
        doc.text('No Tlp :', marginLeft, 112);

        // --- INFO PO (KANAN) ---
        const infoLabelX = pageWidth - marginRight - 230;
        const infoColonX = pageWidth - marginRight - 140;
        const infoValueX = pageWidth - marginRight - 132;
        doc.text('Nomor PO', infoLabelX, 70); doc.text(':', infoColonX, 70); doc.text(noPoValue || '-', infoValueX, 70);
        doc.text('Tanggal', infoLabelX, 84); doc.text(':', infoColonX, 84); doc.text(formattedDate, infoValueX, 84);
        doc.text('Vendor', infoLabelX, 98); doc.text(':', infoColonX, 98); doc.text(vendorHeader, infoValueX, 98);

        // --- TABEL ITEM (sesuai struktur template: NO | NAMA PRODUK | WARNA | KODE VENDOR | YDS | KG | ROLL) ---
        const bodyRows = currentPoBasket.map((item, idx) => {
            const isYds = item.satuan === 'Yards';
            const isKg = item.satuan === 'Kg';
            const isRoll = item.satuan === 'Roll';
            return [
                idx + 1,
                item.namaKain || '-',
                item.warnaLatela || '-',
                item.kodeWarnaVendor || '-',
                isYds ? item.qty : '',
                isKg ? item.qty : '',
                isRoll ? item.qty : ''
            ];
        });
        // Baris kosong tambahan biar konsisten seperti template (kalau item sedikit)
        while (bodyRows.length < 8) bodyRows.push(['', '', '', '', '', '', '']);

        doc.autoTable({
            startY: 130,
            margin: { left: marginLeft, right: marginRight },
            head: [
                [
                    { content: 'NO', rowSpan: 2 },
                    { content: 'NAMA PRODUK', rowSpan: 2 },
                    { content: 'KODE WARNA', colSpan: 2, styles: { halign: 'center' } },
                    { content: 'QUANTITY', colSpan: 3, styles: { halign: 'center' } }
                ],
                ['WARNA', 'KODE VENDOR', 'YDS', 'KG', 'ROLL']
            ],
            body: bodyRows,
            theme: 'grid',
            styles: { fontSize: 9, halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.75, minCellHeight: 24, textColor: [0,0,0] },
            headStyles: { fillColor: [20,20,20], textColor: [255,255,255], fontStyle: 'bold' },
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: contentWidth - (30 + 90 + 90 + 50 + 50 + 50) },
                2: { cellWidth: 90 },
                3: { cellWidth: 90 },
                4: { cellWidth: 50 },
                5: { cellWidth: 50 },
                6: { cellWidth: 50 }
            }
        });

        // --- TANDA TANGAN ---
        const finalY = doc.lastAutoTable.finalY + 60;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
        const signLeftCenterX = marginLeft + (contentWidth * 0.15);
        const signRightCenterX = marginLeft + (contentWidth * 0.85);
        doc.text('CV ARSA', signLeftCenterX, finalY, { align: 'center' });
        doc.text(vendorHeader, signRightCenterX, finalY, { align: 'center' });

        // GAMBAR TANDA TANGAN CV ARSA (ditempatkan di antara nama & garis titik-titik, posisi center)
        const sigWidth = 110;
        const sigHeight = 40.07;
        doc.addImage(SIGNATURE_CV_ARSA_BASE64, 'PNG', signLeftCenterX - (sigWidth / 2), finalY + 4, sigWidth, sigHeight);

        doc.text('(……………………………)', signLeftCenterX, finalY + 60, { align: 'center' });
        doc.text('(……………………………)', signRightCenterX, finalY + 60, { align: 'center' });

        doc.save(`CV_Arsa_Surat_PO_${noPoValue || new Date().toISOString().slice(0,10)}.pdf`);
        updateStatusMessage('PDF Surat PO berhasil dicetak & terdownload.');
    });
}

// 3. MENU NAVIGATION LAYER
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(btn => btn.classList.remove('active')); item.classList.add('active');
        contentViews.forEach(view => view.classList.remove('active'));
        const targetView = document.getElementById(`view-${item.getAttribute('data-target')}`);
        if (targetView) targetView.classList.add('active');
    });
});

subTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        subTabs.forEach(t => t.classList.remove('active')); tab.classList.add('active');
        subTablePanels.forEach(p => p.classList.remove('active'));
        const targetPanel = document.getElementById(`panel-${tab.getAttribute('data-category')}`);
        if (targetPanel) targetPanel.classList.add('active');
        activeFilterText = "all"; populateFilterDropdown(); refreshAllTables();
    });
});

function renderMasterSkuDatabaseView() {
    if (tbodyMasterList) tbodyMasterList.innerHTML = ''; 
    const sortedKeys = Object.keys(masterSkus).sort(); 
    if (masterSkuCount) masterSkuCount.innerText = sortedKeys.length;
    if (sortedKeys.length === 0) return;
    sortedKeys.forEach(sku => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><code>${sku}</code></td><td><strong>${masterSkus[sku].nama}</strong></td><td>${masterSkus[sku].type}</td><td>${masterSkus[sku].warna}</td><td style="text-transform: uppercase;">${masterSkus[sku].kategori}</td>`;
        if (tbodyMasterList) tbodyMasterList.appendChild(tr);
    });
    populateFilterDropdown();
}

function resetKalkulatorDataState() {
    globalDataKategori = { utama: {}, aksesoris: {}, gradeb: {} };
    Object.keys(masterSkus).forEach(sku => {
        const kat = masterSkus[sku].kategori;
        if (globalDataKategori[kat]) {
            globalDataKategori[kat][sku] = { nama: masterSkus[sku].nama, type: masterSkus[sku].type, warna: masterSkus[sku].warna, qty: 0 };
        }
    });
    refreshAllTables();
}

// 4. PARSER LOGIKA EXCEL MANIFEST MARKETPLACE
if (btnAddFile) btnAddFile.addEventListener('click', () => { if (fileInput) fileInput.click(); });
if (fileInput) fileInput.addEventListener('change', (e) => processExcelEngine(e.target.files[0]));

function processExcelEngine(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            ekstrakDanHitungPenjualan(jsonData);
        } catch (err) { updateStatusMessage('Gagal memproses file Excel.'); }
    };
    reader.readAsArrayBuffer(file);
}

function ekstrakDanHitungPenjualan(data) {
    data.forEach(row => {
        let foundSku = "";
        for (let key in row) {
            if (row[key] !== undefined && row[key] !== null) {
                let cellValue = row[key].toString().trim();
                if (masterSkus[cellValue]) { foundSku = cellValue; break; }
            }
        }
        if (foundSku) {
            let rowQty = 1;
            for (let key in row) {
                let keyClean = key.toString().toLowerCase().replace(/[^a-z0-9]/g, "");
                if (["qty", "quantity", "jumlah", "kuantitas", "jumlahproduk", "kuantitaspcs", "jumlahpesanan"].includes(keyClean)) {
                    rowQty = parseInt(row[key], 10) || 1; break;
                }
            }
            const kategori = masterSkus[foundSku].kategori;
            if (globalDataKategori[kategori] && globalDataKategori[kategori][foundSku]) globalDataKategori[kategori][foundSku].qty += rowQty;
        }
    });
    totalMasterFiles += 1; 
    if (fileBadge) fileBadge.innerText = `${totalMasterFiles} File Terupload`;
    refreshAllTables(); updateDashboardMetrics();
}

function renderSingleTable(dataKategori, tbodyElement) {
    if (!tbodyElement) return;
    tbodyElement.innerHTML = '';
    Object.keys(dataKategori).sort().forEach(sku => {
        if (activeFilterText !== "all" && dataKategori[sku].nama !== activeFilterText) return;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${sku}</td><td>${dataKategori[sku].nama}</td><td>${dataKategori[sku].type}</td><td>${dataKategori[sku].warna}</td><td>${dataKategori[sku].qty}</td>`;
        tbodyElement.appendChild(tr);
    });
}

function refreshAllTables() {
    renderSingleTable(globalDataKategori.utama, tbodyUtama);
    renderSingleTable(globalDataKategori.aksesoris, tbodyAksesoris);
    renderSingleTable(globalDataKategori.gradeb, tbodyGradeb); 
}

// 5. UPDATE GRAPHICS METRICS DASHBOARD
function updateDashboardMetrics() {
    const targetProduct = dashFilterDropdown ? dashFilterDropdown.value : "all";
    let qtyUtama = 0, qtyAksesoris = 0, qtyGradeB = 0, skuAktifCount = 0; let productSalesGroup = {};

    const hitung = (dataKategori) => {
        Object.values(dataKategori).forEach(item => {
            if (targetProduct === "all" || item.nama === targetProduct) {
                if (item.qty > 0) { skuAktifCount++; let name = item.nama.trim().toUpperCase(); productSalesGroup[name] = (productSalesGroup[name] || 0) + item.qty; }
                if (item.kategori === 'utama') qtyUtama += item.qty;
                if (item.kategori === 'aksesoris') qtyAksesoris += item.qty;
                if (item.kategori === 'gradeb') qtyGradeB += item.qty;
            }
        });
    };
    hitung(globalDataKategori.utama); hitung(globalDataKategori.aksesoris); hitung(globalDataKategori.gradeb);

    if (dashTotalTerjual) dashTotalTerjual.innerText = (qtyUtama + qtyAksesoris + qtyGradeB).toLocaleString('id-ID');
    if (dashSkuAktif) dashSkuAktif.innerText = skuAktifCount; 
    if (dashFileCount) dashFileCount.innerText = totalMasterFiles;

    if (salesChartInstance) { salesChartInstance.data.datasets[0].data = [qtyUtama, qtyAksesoris, qtyGradeB]; salesChartInstance.update(); }
    if (topProductsChartInstance) {
        let sorted = Object.keys(productSalesGroup).map(k => ({ name: k, qty: productSalesGroup[k] })).sort((a,b) => b.qty - a.qty).slice(0, 5);
        topProductsChartInstance.data.labels = sorted.length ? sorted.map(i => i.name) : ["Kosong"];
        topProductsChartInstance.data.datasets[0].data = sorted.length ? sorted.map(i => i.qty) : [0];
        topProductsChartInstance.update();
    }
}

function populateDashboardDropdown() {
    if (!dashFilterDropdown) return; dashFilterDropdown.innerHTML = '<option value="all">-- Semua Produk --</option>';
    let names = new Set(); Object.values(masterSkus).forEach(i => { if (i.nama) names.add(i.nama.trim().toUpperCase()); });
    Array.from(names).sort().forEach(n => { const opt = document.createElement('option'); opt.value = n; opt.innerText = n; dashFilterDropdown.appendChild(opt); });
}
if (dashFilterDropdown) { dashFilterDropdown.addEventListener('change', () => updateDashboardMetrics()); }

function initDashboardEmptyChart() {
    const sChart = document.getElementById('salesChart');
    const tChart = document.getElementById('trendChart');
    const tpChart = document.getElementById('topProductsChart');
    if (sChart) salesChartInstance = new Chart(sChart.getContext('2d'), { type: 'bar', data: { labels: ['Produk Utama', 'Aksesoris', 'Grade B'], datasets: [{ data: [0, 0, 0], backgroundColor: ['#ec4899', '#2563eb', '#f59e0b'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
    if (tChart) trendChartInstance = new Chart(tChart.getContext('2d'), { type: 'line', data: { labels: ['Mulai'], datasets: [{ data: [0], borderColor: '#8b5cf6', fill: true }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
    if (tpChart) topProductsChartInstance = new Chart(tpChart.getContext('2d'), { type: 'bar', data: { labels: ['Menunggu...'], datasets: [{ data: [0], backgroundColor: '#10b981' }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
}

function populateFilterDropdown() {
    if (!dropdownFilter) return;
    dropdownFilter.innerHTML = '<option value="all">-- Tampilkan Semua Produk --</option>';
    const cat = document.querySelector('.sub-tab.active')?.getAttribute('data-category') || 'utama';
    let names = new Set();
    if (globalDataKategori[cat]) Object.values(globalDataKategori[cat]).forEach(i => { if (i.nama) names.add(i.nama.trim().toUpperCase()); });
    Array.from(names).sort().forEach(n => { const opt = document.createElement('option'); opt.value = n; opt.innerText = n; dropdownFilter.appendChild(opt); });
    dropdownFilter.value = activeFilterText;
}

if (dropdownFilter) dropdownFilter.addEventListener('change', (e) => { activeFilterText = e.target.value; refreshAllTables(); });
if (btnFilterReset) btnFilterReset.addEventListener('click', () => { if (dropdownFilter) dropdownFilter.value = "all"; activeFilterText = "all"; refreshAllTables(); });

if (btnFileReset) {
    btnFileReset.addEventListener('click', () => {
        totalMasterFiles = 0; if (fileBadge) fileBadge.innerText = '0 File Terupload'; resetKalkulatorDataState();
        if (dashTotalTerjual) dashTotalTerjual.innerText = '0'; 
        if (dashSkuAktif) dashSkuAktif.innerText = '0'; 
        if (dashFileCount) dashFileCount.innerText = '0';
    });
}

// 6. COPY AND SAVE HISTORY METHODS
if (btnCopyQty) {
    btnCopyQty.addEventListener('click', () => {
        const cat = document.querySelector('.sub-tab.active').getAttribute('data-category');
        let txt = ""; Object.keys(globalDataKategori[cat]).sort().forEach(k => { if (activeFilterText === "all" || globalDataKategori[cat][k].nama === activeFilterText) txt += `${globalDataKategori[cat][k].qty}\n`; });
        navigator.clipboard.writeText(txt).then(() => updateStatusMessage('Qty copied.'));
    });
}

if (btnSaveHistory) {
    btnSaveHistory.addEventListener('click', () => {
        const sum = (o) => Object.values(o).reduce((s, i) => s + i.qty, 0);
        const tot = sum(globalDataKategori.utama) + sum(globalDataKategori.aksesoris) + sum(globalDataKategori.gradeb);
        if (tot === 0) return;

        updateStatusMessage("Mengirim data harian...");
        const payload = new URLSearchParams();
        payload.append('action', 'save'); payload.append('waktu', new Date().toLocaleString('id-ID'));
        payload.append('files', totalMasterFiles); payload.append('total', tot); payload.append('detail', JSON.stringify(globalDataKategori));

        fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: payload })
        .then(res => res.json()).then(() => { updateStatusMessage("Sukses tersimpan di Cloud!"); fetchHistoryFromCloud(); });
    });
}

function fetchHistoryFromCloud() {
    const container = document.getElementById('history-list-container'); if (!container) return;
    fetch(`${GOOGLE_SCRIPT_URL}?action=fetch`).then(res => res.json()).then(logs => {
        if (!logs.length) return; container.className = "";
        container.innerHTML = '<div class="table-responsive"><table><thead><tr><th>Waktu Simpan</th><th>Files</th><th>Total Qty</th><th>Aksi</th></tr></thead><tbody id="tbody-history"></tbody></table></div>';
        const tbody = document.getElementById('tbody-history');

        // 🔧 NORMALISASI: header di Google Sheets bisa berbeda nama
        // ("waktu" vs "Waktu Simpan", dst), jadi dicoba beberapa kemungkinan key
        const pick = (obj, keys) => {
            for (const k of keys) {
                if (obj[k] !== undefined && obj[k] !== '') return obj[k];
            }
            return '';
        };
        const pickDetail = (obj) => {
            const knownKeys = ['detail', 'Detail'];
            for (const k of knownKeys) { if (obj[k]) return obj[k]; }
            // fallback: ambil value dari key kosong/tak dikenal yang isinya JSON object string
            for (const k in obj) {
                if (!['waktu','Waktu Simpan','files','Files Terproses','total','Total Qty Item'].includes(k)) {
                    if (typeof obj[k] === 'string' && obj[k].trim().startsWith('{')) return obj[k];
                }
            }
            return '';
        };

        logs.reverse().forEach(log => {
            const waktu = pick(log, ['waktu', 'Waktu Simpan']);
            let files = pick(log, ['files', 'Files Terproses']);
            let total = pick(log, ['total', 'Total Qty Item']);
            const detail = pickDetail(log);

            // Bersihkan angka dari embel-embel teks pada data lama (mis. "1 Berkas", "87 pcs")
            files = parseInt(String(files).replace(/[^0-9]/g, ''), 10) || 0;
            total = parseInt(String(total).replace(/[^0-9]/g, ''), 10) || 0;

            globalHistoryCloudCache[waktu] = detail;
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${waktu}</td><td>${files} Berkas</td><td style="color:#ec4899; font-weight:bold;">${total} pcs</td><td><button class="btn-action btn-pink-solid btn-download-history" data-waktu="${waktu}">Download</button></td>`;
            if (tbody) tbody.appendChild(tr);
        });
        document.querySelectorAll('.btn-download-history').forEach(b => {
            b.addEventListener('click', (e) => {
                const cached = globalHistoryCloudCache[e.target.getAttribute('data-waktu')];
                if (!cached) { updateStatusMessage('⚠️ Detail data tidak tersedia untuk riwayat ini.'); return; }
                let snap;
                try { snap = JSON.parse(cached); } catch (err) { updateStatusMessage('⚠️ Gagal membaca detail data.'); return; }
                const wb = XLSX.utils.book_new();
                const fmt = (d) => { let m = [["SKU", "Nama", "Type", "Warna", "Qty"]]; Object.keys(d || {}).sort().forEach(k => m.push([k, d[k].nama, d[k].type, d[k].warna, d[k].qty])); return XLSX.utils.aoa_to_sheet(m); };
                XLSX.utils.book_append_sheet(wb, fmt(snap.utama), "Produk Utama"); XLSX.utils.book_append_sheet(wb, fmt(snap.aksesoris), "Aksesoris"); XLSX.utils.book_append_sheet(wb, fmt(snap.gradeb), "Grade B");
                XLSX.writeFile(wb, `Laporan_Cloud_${e.target.getAttribute('data-waktu').replace(/[^a-zA-Z0-9]/g, "_")}.xlsx`);
            });
        });
    });
}

function generateMasterArrayFormat() {
    let m = [["Kategori", "SKU", "Nama", "Type", "Warna", "Qty"]];
    const ins = (n, o) => Object.keys(o).sort().forEach(k => m.push([n, k, o[k].nama, o[k].type, o[k].warna, o[k].qty]));
    ins("PRODUK UTAMA", globalDataKategori.utama); ins("AKSESORIS", globalDataKategori.aksesoris); ins("GRADE B", globalDataKategori.gradeb); return m;
}

if (btnExportXlsx) {
    btnExportXlsx.addEventListener('click', () => {
        const wb = XLSX.utils.book_new();
        const fmt = (d) => { let m = [["SKU", "Nama", "Type", "Warna", "Qty"]]; Object.keys(d).sort().forEach(k => m.push([k, d[k].nama, d[k].type, d[k].warna, d[k].qty])); return XLSX.utils.aoa_to_sheet(m); };
        XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.utama), "Produk Utama"); XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.aksesoris), "Aksesoris"); XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.gradeb), "Grade B");
        XLSX.writeFile(wb, `Laporan_Tabs_${new Date().toISOString().slice(0,10)}.xlsx`);
    });
}

if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
        const ws = XLSX.utils.aoa_to_sheet(generateMasterArrayFormat());
        const blob = new Blob([XLSX.utils.sheet_to_csv(ws)], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.setAttribute("download", `Laporan_${new Date().toISOString().slice(0,10)}.csv`); a.click();
    });
}

// 7. INPUT MANUAL BERANTAI DROPDOWN
function populateManualNamaDropdown() {
    if (!manualNamaDropdown) return; manualNamaDropdown.innerHTML = '<option value="">-- Pilih Produk --</option>';
    let names = new Set(); Object.values(masterSkus).forEach(i => { if (i.nama) names.add(i.nama.trim().toUpperCase()); });
    Array.from(names).sort().forEach(n => { const opt = document.createElement('option'); opt.value = n; opt.innerText = n; manualNamaDropdown.appendChild(opt); });
}

if (manualNamaDropdown) {
    manualNamaDropdown.addEventListener('change', () => {
        const sNama = manualNamaDropdown.value; if (manualTypeDropdown) manualTypeDropdown.innerHTML = '<option value="">-- Type --</option>'; if (manualWarnaDropdown) manualWarnaDropdown.innerHTML = '<option value="">-- Warna --</option>'; if (manualWarnaDropdown) manualWarnaDropdown.disabled = true;
        if (!sNama) { if (manualTypeDropdown) manualTypeDropdown.disabled = true; return; }
        let types = new Set(); Object.values(masterSkus).forEach(i => { if (i.nama === sNama && i.type) types.add(i.type.trim()); });
        Array.from(types).sort().forEach(t => { const opt = document.createElement('option'); opt.value = t; opt.innerText = t; if (manualTypeDropdown) manualTypeDropdown.appendChild(opt); });
        if (manualTypeDropdown) manualTypeDropdown.disabled = false;
    });
}

if (manualTypeDropdown) {
    manualTypeDropdown.addEventListener('change', () => {
        const sNama = manualNamaDropdown ? manualNamaDropdown.value : ''; const sType = manualTypeDropdown.value; if (manualWarnaDropdown) manualWarnaDropdown.innerHTML = '<option value="">-- Warna --</option>';
        if (!sType) { if (manualWarnaDropdown) manualWarnaDropdown.disabled = true; return; }
        let warnas = new Set(); Object.values(masterSkus).forEach(i => { if (i.nama === sNama && i.type === sType && i.warna) warnas.add(i.warna.trim()); });
        Array.from(warnas).sort().forEach(w => { const opt = document.createElement('option'); opt.value = w; opt.innerText = w; if (manualWarnaDropdown) manualWarnaDropdown.appendChild(opt); });
        if (manualWarnaDropdown) manualWarnaDropdown.disabled = false;
    });
}

if (btnAddManual) {
    btnAddManual.addEventListener('click', () => {
        const n = manualNamaDropdown ? manualNamaDropdown.value : ''; const t = manualTypeDropdown ? manualTypeDropdown.value : ''; const w = manualWarnaDropdown ? manualWarnaDropdown.value : ''; const q = manualQtyInput ? parseInt(manualQtyInput.value, 10) : 0;
        if (!n || !t || !w || isNaN(q) || q <= 0) return;
        let tSku = null; for (let k in masterSkus) { if (masterSkus[k].nama === n && masterSkus[k].type === t && masterSkus[k].warna === w) { tSku = k; break; } }
        if (tSku) {
            const cat = masterSkus[tSku].kategori;
            if (globalDataKategori[cat] && globalDataKategori[cat][tSku]) { globalDataKategori[cat][tSku].qty += q; refreshAllTables(); updateDashboardMetrics(); if (manualQtyInput) manualQtyInput.value = ""; }
        }
    });
}
function updateStatusMessage(msg) { if (statusBar) statusBar.innerText = msg; }
